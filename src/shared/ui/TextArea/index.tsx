import { FormHelperText } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { Box } from "@mui/system";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface ITextareaProps<T> {
  name: string;
  placeholder?: string;
  label?: string;
  rules?: Omit<
    RegisterOptions<T>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  minRows?: number;
}

const BasicTextArea = <T extends unknown>(props: ITextareaProps<T>) => {
  const { name, rules, placeholder, minRows = 4 } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        "& .textarea": {
          width: "100%",
          resize: "none",
          borderRadius: 1,
          padding: 1,
          borderColor: "primary.main",
          borderWidth: 2,
        },
      }}
    >
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field }) => {
          return (
            <Box>
              <TextareaAutosize
                {...field}
                placeholder={placeholder}
                minRows={minRows}
                className="textarea"
              />
            </Box>
          );
        }}
      />
      {errors?.[name]?.message ? (
        <FormHelperText error>
          {errors?.[name]?.message as string}
        </FormHelperText>
      ) : null}
    </Box>
  );
};

export default BasicTextArea;
