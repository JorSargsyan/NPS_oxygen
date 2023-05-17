import { Box, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import ButtonLoader from "shared/ui/ButtonLoader";
import { EFeedbackStatusesModalTypes } from "store/enums/feedbacks.enum";
import { ERequestStatus } from "store/enums/index.enum";
import { ICauseCategory } from "store/interfaces/feedback";
import {
  selectButtonLoadingState,
  setButtonLoading,
} from "store/slicers/common";
import {
  ChangeFeedbackStatus,
  UpdateCustomerMood,
  UpdateCustomerRootCause,
} from "store/slicers/feedback";
import { IActiveRow } from "../..";
import CustomerMoodRadioGroup from "./CustomerMoodRadioGroup";
import RootCauseCategoriesAutocomplete from "./RootCauseCategoriesAutocomplete";

type Props = { editData: IActiveRow; onSuccess: () => void };
type FormData = {
  causeCategories?: ICauseCategory[] | undefined;
  mood?: string;
};

const FeedbackStatusDrawer = ({ editData, onSuccess }: Props) => {
  const isLoading = useSelector(selectButtonLoadingState);
  const methods = useForm<FormData>();
  const dispatch = useAsyncDispatch();

  const onSubmit = async (formData: FormData) => {
    await dispatch(setButtonLoading(true));
    if (formData?.causeCategories?.length) {
      const rootCauseIDs = formData?.causeCategories.map((c) => c.rootCauseID);
      const { meta } = await dispatch(
        UpdateCustomerRootCause({
          id: editData.rowId,
          formData: { rootCauseIDs },
        })
      );
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        await dispatch(setButtonLoading(false));
        return;
      }
    }
    if (formData?.mood) {
      const { meta } = await dispatch(
        UpdateCustomerMood({
          id: editData.rowId,
          formData: { customerMood: Number(formData?.mood) },
        })
      );
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        await dispatch(setButtonLoading(false));
        return;
      }
    }
    const { meta } = await dispatch(
      ChangeFeedbackStatus({
        id: editData.rowId,
        formData: {
          state: editData.state,
        },
      })
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      await dispatch(setButtonLoading(false));
      return;
    }
    onSuccess?.();
    await dispatch(setButtonLoading(false));
  };

  const requiresOnlyCause = useMemo(() => {
    return (
      (editData?.type === EFeedbackStatusesModalTypes.Requires_Cause ||
        editData?.type === EFeedbackStatusesModalTypes.Requires_Both) &&
      !editData?.data.rootCauseIDs?.length
    );
  }, [editData?.data.rootCauseIDs?.length, editData?.type]);

  const requiresBoth = useMemo(() => {
    return (
      editData?.type === EFeedbackStatusesModalTypes.Requires_Both &&
      !editData?.data.customerMood
    );
  }, [editData?.data.customerMood, editData?.type]);

  return (
    <FormProvider {...methods}>
      {requiresOnlyCause && (
        <Grid item xs={12}>
          <RootCauseCategoriesAutocomplete />
        </Grid>
      )}
      {requiresBoth && (
        <Grid item xs={12} sx={requiresOnlyCause && { paddingTop: 4 }}>
          <CustomerMoodRadioGroup />
        </Grid>
      )}
      <Box pt={4}>
        <ButtonLoader
          fullWidth
          onClick={methods.handleSubmit(onSubmit)}
          isLoading={isLoading}
          type="submit"
        >
          <Typography>{"Save"}</Typography>
        </ButtonLoader>
      </Box>
    </FormProvider>
  );
};

export default FeedbackStatusDrawer;
