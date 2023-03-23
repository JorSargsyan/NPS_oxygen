import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicAutocomplete from "shared/ui/Autocomplete";
import ButtonLoader from "shared/ui/ButtonLoader";
import { EFeedbackStatusesModalTypes, EMood } from "store/enums/feedbacks.enum";
import { ERequestStatus } from "store/enums/index.enum";
import { ICauseCategory } from "store/interfaces/feedback";
import { selectLoadingState, setLoading } from "store/slicers/common";
import {
  ChangeFeedbackStatus,
  selectCauseCategories,
  UpdateCustomerMood,
  UpdateCustomerRootCause,
} from "store/slicers/feedback";
import { IActiveRow } from "..";

type Props = { editData: IActiveRow; onSuccess: () => void };
type FormData = {
  causeCategories?: ICauseCategory[] | undefined;
  mood?: string;
};

const FeedbackStatusDrawer = ({ editData, onSuccess }: Props) => {
  const isLoading = useSelector(selectLoadingState);
  const causeCategoriesList = useSelector(selectCauseCategories);
  const methods = useForm<FormData>();
  const dispatch = useAsyncDispatch();

  const onSubmit = async (formData: FormData) => {
    dispatch(setLoading(true));
    if (formData?.causeCategories?.length) {
      const rootCauseIDs = formData?.causeCategories.map((c) => c.rootCauseID);
      const { meta } = await dispatch(
        UpdateCustomerRootCause({
          id: editData.rowId,
          formData: { rootCauseIDs },
        })
      );
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setLoading(false));
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
        dispatch(setLoading(false));
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
      dispatch(setLoading(false));
      return;
    }
    onSuccess?.();
    dispatch(setLoading(false));
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
          <BasicAutocomplete<any>
            name="causeCategories"
            options={causeCategoriesList}
            inputLabel={"Cause categories"}
            multiple
            defaultValue={[]}
            prefix="permissions"
            optionLabel="rootCauseName"
            groupBy={(option) => option.causeCategoryName}
          />
        </Grid>
      )}
      {requiresBoth && (
        <Grid item xs={12} sx={requiresOnlyCause && { paddingTop: 4 }}>
          <FormLabel>Customer Mood</FormLabel>
          <Controller
            control={methods.control}
            name="mood"
            defaultValue={EMood.Good}
            render={({ field }) => {
              return (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value={EMood.Good}
                    control={<Radio />}
                    label="Good"
                  />
                  <FormControlLabel
                    value={EMood.Neutral}
                    control={<Radio />}
                    label="Neutral"
                  />
                  <FormControlLabel
                    value={EMood.Bad}
                    control={<Radio />}
                    label="Bad"
                  />
                </RadioGroup>
              );
            }}
          />
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
