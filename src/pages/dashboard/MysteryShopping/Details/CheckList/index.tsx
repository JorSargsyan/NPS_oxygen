import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { checkListData } from "../../constants";
import { Fragment, useState } from "react";
import BasicTextArea from "shared/ui/TextArea";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckList = ({ actualUseCaseID }: { actualUseCaseID: string }) => {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const [checkedAnswers, setCheckedAnswers] = useState(
    new Array(checkListData.length).fill(false)
  );

  const handleChange = (index, checked) => {
    const newChecked = [...checkedAnswers];
    newChecked[index] = checked;

    setCheckedAnswers(newChecked);
  };

  const onSubmit = () => {
    const result = checkedAnswers.filter((i) => i).length;

    const formData = {
      evaluation: String(result),
      comment: methods.watch("comment"),
    };

    localStorage.setItem(actualUseCaseID, JSON.stringify(formData));
    toast.success("Your review has been saved successfully");
    navigate("/admin/mystery-shopping");
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Typography>Check list</Typography>
        <Box maxHeight={400} sx={{ overflowY: "scroll" }}>
          {checkListData.map((check, index) => {
            return (
              <Fragment key={check.id}>
                <Box>
                  <FormControlLabel
                    sx={{
                      paddingBottom: "10px",
                      paddingTop: "10px",
                      color: checkedAnswers[index] && "success.main",
                    }}
                    control={
                      <Checkbox
                        color="success"
                        checked={checkedAnswers[index]}
                        onChange={(_, checked) => handleChange(index, checked)}
                      />
                    }
                    label={check.text}
                  />
                  <Divider />
                </Box>
              </Fragment>
            );
          })}
        </Box>
        <Box>
          <BasicTextArea minRows={1} placeholder="Comment" name={"comment"} />
        </Box>
        <Box display="flex" pt={2} justifyContent={"flex-end"}>
          <Button onClick={methods.handleSubmit(onSubmit)} variant="outlined">
            Submit
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CheckList;
