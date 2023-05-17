import { Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import ButtonLoader from "shared/ui/ButtonLoader";
import { ERequestStatus } from "store/enums/index.enum";
import { ICauseAndMoodRes, ICauseCategory } from "store/interfaces/feedback";
import {
  selectButtonLoadingState,
  setButtonLoading,
} from "store/slicers/common";
import {
  UpdateCustomerRootCause,
  UpdateCustomerMood,
  GetFeedbackCauseAndMood,
  selectCauseCategories,
  selectCauseMoodValues,
} from "store/slicers/feedback";
import CustomerMoodRadioGroup from "../../FeedbackStatusDrawer/CustomerMoodRadioGroup";
import RootCauseCategoriesAutocomplete from "../../FeedbackStatusDrawer/RootCauseCategoriesAutocomplete";

type FormData = {
  causeCategories?: ICauseCategory[] | undefined;
  mood?: string;
};

const skeletonArr = new Array(3).fill("");

const TabRootCauseComponent = () => {
  const methods = useForm<FormData>();
  const dispatch = useAsyncDispatch();
  const { id } = useParams();
  const [isDataLoaded, setDataLoaded] = useState(false);

  const isLoading = useSelector(selectButtonLoadingState);
  const causeCategoriesList = useSelector(selectCauseCategories);
  const causeMoodValues = useSelector(selectCauseMoodValues);

  const onSubmit = async (formData: FormData) => {
    dispatch(setButtonLoading(true));
    if (formData?.causeCategories?.length) {
      const rootCauseIDs = formData?.causeCategories.map((c) => c.rootCauseID);
      const { meta } = await dispatch(
        UpdateCustomerRootCause({
          id: Number(id),
          formData: { rootCauseIDs },
        })
      );
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setButtonLoading(false));
        return;
      }
    }
    if (
      formData?.mood &&
      formData?.mood !== String(causeMoodValues?.customerMood)
    ) {
      const { meta } = await dispatch(
        UpdateCustomerMood({
          id: Number(id),
          formData: { customerMood: Number(formData?.mood) },
        })
      );
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setButtonLoading(false));
        return;
      }
    }
    toast.success("Saved");
    dispatch(setButtonLoading(false));
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
    setDataLoaded(false);
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
      mood: typedPayload?.customerMood?.toString() ?? "",
      causeCategories: list ?? [],
    });
    setDataLoaded(true);
  }, [causeCategoriesList, dispatch, id, methods]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Box p={2}>
      <FormProvider {...methods}>
        {isDataLoaded ? (
          <>
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
          </>
        ) : (
          skeletonArr.map((i, index) => {
            return (
              <Skeleton
                sx={{ mb: 3 }}
                key={index}
                variant="rounded"
                animation="wave"
                width="100%"
                height="50px"
              />
            );
          })
        )}
      </FormProvider>
    </Box>
  );
};

export default TabRootCauseComponent;
