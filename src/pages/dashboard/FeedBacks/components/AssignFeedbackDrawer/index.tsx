import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import {
  selectButtonLoadingState,
  selectManagers,
  setButtonLoading,
} from "store/slicers/common";
import { UpdateFeedbackManager } from "store/slicers/feedback";
import { IManagerUser } from "store/interfaces/common";
import BasicSelect from "shared/ui/Select";
import WarningIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon";
import { SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ButtonLoader from "shared/ui/ButtonLoader";
import { requiredRules } from "shared/helpers/validators";

type Props = {
  hasAssignedUser?: boolean;
  selectedIDs: number[];
  onSubmitCb: () => void;
};

type FormData = { assignUserID: number };

const AssignFeedbackDrawer = (props: Props) => {
  const { hasAssignedUser, selectedIDs, onSubmitCb } = props;
  const dispatch = useAsyncDispatch();
  const methods = useForm<FormData>();
  const managersList = useSelector(selectManagers);
  const isLoading = useSelector(selectButtonLoadingState);

  const onSubmit = async (data: FormData) => {
    await dispatch(setButtonLoading(true));
    const { meta } = await dispatch(
      UpdateFeedbackManager({
        assignUserID: data.assignUserID,
        feedbackIDs: selectedIDs,
      })
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      await dispatch(setButtonLoading(false));
      return;
    }
    await dispatch(setButtonLoading(false));
    onSubmitCb?.();
  };

  return (
    <FormProvider {...methods}>
      <BasicSelect<IManagerUser>
        name="assignUserID"
        defaultValue={""}
        label="Manager"
        valueProp="id"
        labelProp="label"
        options={managersList?.[0]?.users || []}
        rules={requiredRules}
      />
      {hasAssignedUser ? (
        <Box display="flex" mt={3}>
          <SvgIcon color="warning">
            <WarningIcon />
          </SvgIcon>
          <Typography sx={{ color: "warning.main", ml: 1 }}>
            Please note that some feedbacks are already assigned. Once you make
            new selection the assignment will be changed.
          </Typography>
        </Box>
      ) : null}

      <Box mt={3}>
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

export default AssignFeedbackDrawer;
