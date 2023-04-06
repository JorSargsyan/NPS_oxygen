import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { requiredRules } from "shared/helpers/validators";
import { selectQuestion } from "store/slicers/surveyPreview";

const SingleChoiceQuestion = () => {
  const methods = useFormContext();
  const questionData = useSelector(selectQuestion);
  return (
    <Box>
      <Controller
        name={"singleChoice"}
        defaultValue={""}
        control={methods.control}
        rules={requiredRules}
        render={({ field }) => (
          <FormControl>
            <RadioGroup {...field} defaultValue="" name="radio-buttons-group">
              {questionData?.details.answers.map((answer) => (
                <FormControlLabel
                  key={answer.id}
                  value={answer.id}
                  control={<Radio />}
                  label={answer.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default SingleChoiceQuestion;
