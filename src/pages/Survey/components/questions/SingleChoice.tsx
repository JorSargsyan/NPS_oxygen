import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import { requiredRules } from "shared/helpers/validators";

const SingleChoiceQuestion = ({ questionData }) => {
  const methods = useFormContext();

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
              {questionData?.details?.answers.map((answer) => (
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
