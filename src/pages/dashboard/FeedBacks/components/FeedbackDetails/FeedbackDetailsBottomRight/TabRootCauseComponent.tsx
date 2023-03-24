import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import ButtonLoader from "shared/ui/ButtonLoader";
import { ERequestStatus } from "store/enums/index.enum";
import { ICauseAndMoodRes, ICauseCategory } from "store/interfaces/feedback";
import { selectLoadingState, setLoading } from "store/slicers/common";
import {
  UpdateCustomerRootCause,
  UpdateCustomerMood,
  GetFeedbackCauseAndMood,
  selectCauseCategories,
} from "store/slicers/feedback";
import CustomerMoodRadioGroup from "../../FeedbackStatusDrawer/CustomerMoodRadioGroup";
import RootCauseCategoriesAutocomplete from "../../FeedbackStatusDrawer/RootCauseCategoriesAutocomplete";

type FormData = {
  causeCategories?: ICauseCategory[] | undefined;
  mood?: string;
};

const TabRootCauseComponent = () => {
  const methods = useForm<FormData>();
  const dispatch = useAsyncDispatch();
  const { id } = useParams();

  const isLoading = useSelector(selectLoadingState);
  const causeCategoriesList = useSelector(selectCauseCategories);

  const onSubmit = async (formData: FormData) => {
    dispatch(setLoading(true));
    if (formData?.causeCategories?.length) {
      const rootCauseIDs = formData?.causeCategories.map((c) => c.rootCauseID);
      const { meta } = await dispatch(
        UpdateCustomerRootCause({
          id: Number(id),
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
          id: Number(id),
          formData: { customerMood: Number(formData?.mood) },
        })
      );
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setLoading(false));
        return;
      }
    }
    dispatch(setLoading(false));
  };

  const isButtonDisabled = useMemo(() => {
    return (
      !methods.formState.touchedFields.causeCategories &&
      !methods.formState.isDirty
    );
  }, [
    methods.formState.touchedFields.causeCategories,
    methods.formState.isDirty,
  ]);

  const initialFetch = useCallback(async () => {
    const { meta, payload } = await dispatch(
      GetFeedbackCauseAndMood(Number(id))
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    const typedPayload = payload as ICauseAndMoodRes;
    const list = causeCategoriesList.filter((c) =>
      typedPayload.rootCauseIDs.includes(c.rootCauseID)
    );

    methods.reset({
      mood: typedPayload.customerMood.toString() ?? "",
      causeCategories: list ?? [],
    });
  }, [causeCategoriesList, dispatch, id, methods]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Box p={2}>
      <FormProvider {...methods}>
        <Grid item xs={12}>
          <RootCauseCategoriesAutocomplete />
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 4 }}>
          <CustomerMoodRadioGroup />
        </Grid>
        <Box
          sx={{
            paddingTop: 4,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonLoader
            onClick={methods.handleSubmit(onSubmit)}
            isLoading={isLoading}
            type="submit"
            disabled={isButtonDisabled}
          >
            <Typography>{"Save"}</Typography>
          </ButtonLoader>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default TabRootCauseComponent;
