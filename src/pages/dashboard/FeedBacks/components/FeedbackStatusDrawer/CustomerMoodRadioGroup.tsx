import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import usePermission from "shared/helpers/hooks/usePermission";
import { EMood } from "store/enums/feedbacks.enum";

type Props = {};

const CustomerMoodRadioGroup = (props: Props) => {
  const { control } = useFormContext();

  const hasChangePermission = usePermission(
    EFeedbackPermissions.Select_root_cause_mood
  );

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
                disabled={!hasChangePermission}
                value={EMood.Good}
                control={<Radio />}
                label="Good"
              />
              <FormControlLabel
                disabled={!hasChangePermission}
                value={EMood.Neutral}
                control={<Radio />}
                label="Neutral"
              />
              <FormControlLabel
                disabled={!hasChangePermission}
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
