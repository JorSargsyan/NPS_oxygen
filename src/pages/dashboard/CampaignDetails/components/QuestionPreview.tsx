import {
  CardContent,
  Card,
  ToggleButtonGroup,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import SurveyTemplate, {
  ISurveyTemplateQuestionData,
} from "shared/components/SurveyTemplate";
import StyledToggleButton from "shared/ui/ToggleButton";
import MobileIcon from "@heroicons/react/24/solid/DevicePhoneMobileIcon";
import DesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import { MouseEvent, useState } from "react";

type Props = {
  previewModalData: ISurveyTemplateQuestionData;
  methods: any;
};

export enum EQuestionPreviewType {
  MOBILE = 1,
  DESKTOP,
}

const QuestionPreview = ({ previewModalData }: Props) => {
  const [type, setType] = useState(EQuestionPreviewType.DESKTOP);

  const methods = useForm({
    defaultValues: {
      answerIDs: [],
      comment: "",
      singleChoice: "",
      contact: "",
      rate: 0,
      contactConfig: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      },
    },
  });

  const chooseType = (
    event: MouseEvent<HTMLElement>,
    newAlignment: EQuestionPreviewType | null
  ) => {
    if (newAlignment !== null) {
      setType(newAlignment);
    }
  };

  return (
    <Box
      sx={
        type === EQuestionPreviewType.MOBILE
          ? { justifyContent: "center", display: "flex", background: "white" }
          : null
      }
    >
      <Box
        sx={
          type === EQuestionPreviewType.MOBILE
            ? { width: "360px" }
            : { width: "100vw" }
        }
      >
        <Box
          display="flex"
          justifyContent={"center"}
          sx={{
            backgroundImage: `url(${require("assets/images/bg.png")})`,
            height: "94.4vh",
            backgroundSize: "cover",
          }}
        >
          <Box p={2}>
            <Box textAlign="center" pb={1}>
              <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
                onChange={chooseType}
              >
                <StyledToggleButton
                  value={EQuestionPreviewType.DESKTOP}
                  selected={type === EQuestionPreviewType.DESKTOP}
                >
                  <SvgIcon fontSize="small">
                    <DesktopIcon />
                  </SvgIcon>
                  <Typography sx={{ marginLeft: 1 }}>DESKTOP</Typography>
                </StyledToggleButton>
                <StyledToggleButton
                  value={EQuestionPreviewType.MOBILE}
                  selected={type === EQuestionPreviewType.MOBILE}
                >
                  <SvgIcon fontSize="small">
                    <MobileIcon />
                  </SvgIcon>
                  <Typography sx={{ marginLeft: 1 }}>MOBILE</Typography>
                </StyledToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Card
              sx={{
                height: { xs: "80vh" },
                backgroundColor: "rgb(255 255 255 / 97%)",
                overflowY: "scroll",
              }}
            >
              <CardContent
                sx={{
                  py: { xs: "10px", lg: "16px" },
                  px: 0,
                  ":last-child": {
                    pb: 0,
                  },
                }}
              >
                <Box
                  sx={
                    type === EQuestionPreviewType.MOBILE
                      ? {}
                      : {
                          width: {
                            xs: "85vw",
                            sm: "80vw",
                            md: "60vw",
                            lg: "50vw",
                          },
                        }
                  }
                >
                  <SurveyTemplate
                    methods={methods}
                    viewType={type}
                    questionData={previewModalData}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionPreview;
