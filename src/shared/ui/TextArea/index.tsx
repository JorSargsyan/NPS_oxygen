import { TextareaAutosize } from "@mui/material";
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
  const { name, rules, placeholder, label, minRows = 4 } = props;
  const { control } = useFormContext();

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
            <TextareaAutosize
              {...field}
              aria-label={label}
              placeholder={placeholder}
              minRows={minRows}
              className="textarea"
            />
          );
        }}
      />
    </Box>
  );
};

export default BasicTextArea;
