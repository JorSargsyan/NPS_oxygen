import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import ResetIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import TextInput from "shared/ui/TextInput";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import ClipBoardIcon from "@heroicons/react/24/outline/ClipboardDocumentListIcon";
import FireIcon from "@heroicons/react/24/outline/FireIcon";
import QuestionIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import BuildingIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import { CreateCampaign } from "store/slicers/campaigns";
import { ERequestStatus } from "store/enums/index.enum";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import ButtonLoader from "shared/ui/ButtonLoader";
import { requiredRules } from "shared/helpers/validators";

interface IFormData {
  surveyMetric: string;
  type: string;
  touchpoint: string;
  name: string;
}

const defaultValues = {
  surveyMetric: "1",
  name: "",
  type: "1",
  touchpoint: "1",
};

const AddCampaign = ({ onSuccess }: { onSuccess: () => void }) => {
  const methods = useForm<IFormData>({
    defaultValues,
  });
  const dispatch = useAsyncDispatch();

  const dynamicRadioStyles = (name, value) => ({
    border: `3px solid`,
    borderRadius: "16px",
    borderColor: methods.watch(name) === value ? "primary.main" : "lightgray",
    backgroundColor:
      methods.watch(name) === value ? "primary.lightest" : "white",
  });

  const handleReset = () => {
    methods.reset(defaultValues);
  };

  const onSubmit = async (formData) => {
    const { meta } = await dispatch(CreateCampaign(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    onSuccess?.();
  };

  return (
    <FormProvider {...methods}>
      <Box display="flex" justifyContent="space-between">
        <Box width={"400px"}>
          <TextInput name={"name"} label={"Name"} rules={requiredRules} />
        </Box>
        <Button
          onClick={handleReset}
          startIcon={<ResetIcon height={24} width={24} />}
          variant="outlined"
        >
          <Typography>Reset</Typography>
        </Button>
      </Box>
      <Grid container spacing={3} mt={4}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Select metric" />
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display={"flex"}>
                    <Box
                      onClick={() => methods.setValue("surveyMetric", "1")}
                      sx={dynamicRadioStyles("surveyMetric", "1")}
                      mr={2}
                      py={2}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <ChartBarIcon height={80} />
                      <Typography textAlign={"center"} fontWeight={600}>
                        NPS
                      </Typography>
                      <Typography fontSize={12} textAlign={"center"}>
                        NPS is used to measure the customers loyalty
                      </Typography>
                    </Box>
                    <Box
                      onClick={() => methods.setValue("surveyMetric", "2")}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      sx={dynamicRadioStyles("surveyMetric", "2")}
                    >
                      <ClipBoardIcon height={80} />
                      <Typography fontWeight={600} textAlign={"center"}>
                        Custom
                      </Typography>
                      <Typography fontSize={12} textAlign={"center"}>
                        NPS is used to measure the customers loyalty
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Select type" />
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display={"flex"}>
                    <Box
                      onClick={() => methods.setValue("type", "1")}
                      sx={dynamicRadioStyles("type", "1")}
                      mr={2}
                      py={2}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <FireIcon height={80} />
                      <Typography textAlign={"center"} fontWeight={600}>
                        Transactional
                      </Typography>
                      <Typography fontSize={12} textAlign={"center"}>
                        NPS is used to measure the customers loyalty
                      </Typography>
                    </Box>
                    <Box
                      onClick={() => methods.setValue("type", "2")}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      sx={dynamicRadioStyles("type", "2")}
                    >
                      <QuestionIcon height={80} />
                      <Typography fontWeight={600} textAlign={"center"}>
                        Regular
                      </Typography>
                      <Typography fontSize={12} textAlign={"center"}>
                        NPS is used to measure the customers loyalty
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Select touchpoint" />
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display={"flex"}>
                    <Box
                      onClick={() => methods.setValue("touchpoint", "1")}
                      sx={dynamicRadioStyles("touchpoint", "1")}
                      mr={2}
                      py={2}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <BuildingIcon height={80} />
                      <Typography textAlign={"center"} fontWeight={600}>
                        Branch net
                      </Typography>
                      <Typography fontSize={12} textAlign={"center"}>
                        NPS is used to measure the customers loyalty
                      </Typography>
                    </Box>
                    <Box
                      onClick={() => methods.setValue("touchpoint", "2")}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      sx={dynamicRadioStyles("touchpoint", "2")}
                    >
                      <PhoneIcon height={80} />
                      <Typography fontWeight={600} textAlign={"center"}>
                        Call center
                      </Typography>
                      <Typography fontSize={12} textAlign={"center"}>
                        NPS is used to measure the customers loyalty
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Box
        mt={2}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        display="flex"
        justifyContent={"flex-end"}
      >
        <Box>
          <ButtonLoader
            onClick={methods.handleSubmit(onSubmit)}
            isLoading={false}
            type="submit"
          >
            <Typography>Save</Typography>
          </ButtonLoader>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AddCampaign;
