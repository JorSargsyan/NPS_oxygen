import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { EMood } from "store/enums/feedbacks.enum";

type Props = {};

const CustomerMoodRadioGroup = (props: Props) => {
  const { control } = useFormContext();
  return (
    <>
      <FormLabel>Customer Mood</FormLabel>
      <Controller
        control={control}
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
    </>
  );
};

export default CustomerMoodRadioGroup;
