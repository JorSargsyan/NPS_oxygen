import { Grid, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { requiredRules } from "shared/helpers/validators";
import ButtonLoader from "shared/ui/ButtonLoader";
import BasicSelect from "shared/ui/Select";
import TextInput from "shared/ui/TextInput";
import { ERequestStatus } from "store/enums/index.enum";
import { ELanguageIds } from "store/enums/translations.enum";
import { AppDispatch } from "store/index";
import {
  IAddEditTranslation,
  ITranslation,
} from "store/interfaces/translations";
import { selectLoadingState, setLoading } from "store/slicers/common";
import { AddTranslation } from "store/slicers/translations";
import {
  ITranslationModuleOptions,
  translationModuleOptions,
} from "../constants";

interface IFormData {
  key: string;
  am: string;
  en: string;
  ru: string;
  translationModule: number;
}

const AddEditTranslations = ({
  onSuccess,
  editData,
}: {
  onSuccess: () => void;
  editData?: ITranslation;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm<IFormData>({
    defaultValues: {
      key: "",
      am: "",
      en: "",
      ru: "",
      translationModule: 0,
    },
  });
  const isLoading = useSelector(selectLoadingState);

  const onSubmit = async (data: IFormData) => {
    dispatch(setLoading(true));
    const formData: IAddEditTranslation = {
      translationModule: data.translationModule,

      key: data.key,
      captions: [
        {
          value: data.am?.trim() ? data.am : "N/A",
          languageID: 1,
        },
        {
          value: data.en?.trim() ? data.en : "N/A",
          languageID: 2,
        },
        {
          value: data.ru?.trim() ? data.ru : "N/A",
          languageID: 3,
        },
      ],
    };
    const { meta } = await dispatch(AddTranslation(formData));

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      dispatch(setLoading(false));
      return;
    }
    const message = editData
      ? "Country Updated Successfully"
      : "Country Added Successfully";
    toast.success(message);
    dispatch(setLoading(false));
    onSuccess();
  };

  const setEditData = useCallback(() => {
    if (editData) {
      const am = editData.captions.find(
        (c) => c.languageId === ELanguageIds.Armenian
      );
      const en = editData.captions.find(
        (c) => c.languageId === ELanguageIds.English
      );
      const ru = editData.captions.find(
        (c) => c.languageId === ELanguageIds.Russian
      );
      methods.reset({
        translationModule: editData.translationModule,
        key: editData.key,
        am: am?.value,
        en: en?.value,
        ru: ru?.value,
      });
    }
  }, [editData, methods]);

  useEffect(() => {
    setEditData();
  }, [setEditData]);

  return (
    <Fragment>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <BasicSelect<ITranslationModuleOptions>
                name="translationModule"
                label="Translation Module"
                valueProp="value"
                labelProp="name"
                options={translationModuleOptions}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput<IFormData>
                label="Translation key"
                name="key"
                rules={requiredRules}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput<IFormData> label="Armenian" name="am" />
            </Grid>
            <Grid item xs={12}>
              <TextInput<IFormData> label="English" name="en" />
            </Grid>
            <Grid item xs={12}>
              <TextInput<IFormData> label="Russian" name="ru" />
            </Grid>
            <Grid item xs={12}>
              <ButtonLoader
                fullWidth
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={isLoading}
                type="submit"
              >
                <Typography>Save</Typography>
              </ButtonLoader>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </Fragment>
  );
};

export default AddEditTranslations;
