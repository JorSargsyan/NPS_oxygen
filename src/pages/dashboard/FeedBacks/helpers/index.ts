import {
  EFeedbackStatus,
  EFeedbackStatusesModalTypes,
} from "store/enums/feedbacks.enum";
import { ERequestStatus } from "store/enums/index.enum";
import {
  ChangeFeedbackStatus,
  GetFeedbackCauseAndMood,
} from "store/slicers/feedback";

export const changeFeedbackStatus = async ({
  dispatch,
  rowId,
  value,
  setDrawerOpen,
  setActiveRow,
  refetchFeedbacks,
}) => {
  const { meta } = await dispatch(
    ChangeFeedbackStatus({
      id: rowId,
      formData: {
        state: value,
      },
    })
  );

  if (meta.requestStatus !== ERequestStatus.FULFILLED) {
    const causeAndMooRes = await dispatch(GetFeedbackCauseAndMood(rowId));
    setDrawerOpen(true);
    if (causeAndMooRes.meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    if (
      value === EFeedbackStatus.Postponed ||
      value === EFeedbackStatus.Misrated
    ) {
      setActiveRow({
        type: EFeedbackStatusesModalTypes.Requires_Cause,
        data: causeAndMooRes.payload,
        rowId,
        state: value,
      });
    } else if (
      value === EFeedbackStatus.Resolved ||
      value === EFeedbackStatus.Not_Resolved
    ) {
      setActiveRow({
        type: EFeedbackStatusesModalTypes.Requires_Both,
        data: causeAndMooRes.payload,
        rowId,
        state: value,
      });
    } else {
      setActiveRow(undefined);
    }
  } else {
    refetchFeedbacks?.();
  }
};
