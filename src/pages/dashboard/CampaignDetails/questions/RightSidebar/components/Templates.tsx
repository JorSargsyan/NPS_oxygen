import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectTemplates } from "store/slicers/campaignDetail";
import BasicSelect from "shared/ui/Select";
import { FormProvider, useForm } from "react-hook-form";
import { IconButton, Paper } from "@mui/material";
import { useMemo } from "react";
import { Typography } from "antd";

const Templates = () => {
  const methods = useForm({
    defaultValues: {
      theme: 1,
    },
  });

  const themeId = methods.watch("theme");
  const templateList = useSelector(selectTemplates);

  const template = useMemo(() => {
    return templateList.find((i) => i.id === themeId);
  }, [templateList, themeId]);

  console.log(template);

  return (
    <Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        <FormProvider {...methods}>
          <BasicSelect
            options={templateList}
            label="Theme"
            name="theme"
            valueProp="id"
            labelProp="name"
          />
        </FormProvider>
        <Box
          display="flex"
          alignItems={"center"}
          width="100%"
          justifyContent={"space-between"}
        >
          <Typography>Button Color</Typography>
          <IconButton>
            <Box
              component={Paper}
              height={25}
              width={25}
              sx={{
                backgroundColor: template?.buttonColor,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems={"center"}
          width="100%"
          justifyContent={"space-between"}
        >
          <Typography>Button Text Color</Typography>
          <IconButton>
            <Box
              component={Paper}
              height={25}
              width={25}
              sx={{
                backgroundColor: template?.buttonTextColor,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems={"center"}
          width="100%"
          justifyContent={"space-between"}
        >
          <Typography>Question Color</Typography>
          <IconButton>
            <Box
              component={Paper}
              height={25}
              width={25}
              sx={{
                backgroundColor: template?.quesstionColor,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Box>
        <Box
          display="flex"
          width="100%"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>Answer Color</Typography>
          <IconButton>
            <Box
              component={Paper}
              height={25}
              width={25}
              sx={{
                backgroundColor: template?.answerColor,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Templates;
