import { InputAdornment, TextField } from "@mui/material";
import { Fragment, useCallback, KeyboardEvent, Ref, useState } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import CrossIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IInputProps<T> {
  size?: "small" | "medium";
  name: string;
  multiline?: boolean;
  label: string;
  placeholder?: string;
  isSecure?: boolean;
  type?: string;
  clearable?: boolean;
  rules?: Omit<
    RegisterOptions<T>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  onClear?: () => void;
  onKeyPress?: (parameter: KeyboardEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}

const InputField = <T extends unknown>({
  size,
  name,
  label,
  placeholder = "",
  type,
  multiline = false,
  clearable = false,
  rules,
  isSecure = false,
  onKeyPress,
  onClear,
  inputRef,
  disabled,
}: IInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [invisible, setVisible] = useState(true);

  const handleClearInput = (field: any) => {
    field.onChange((e: any) => (field.value = ""));
    onClear?.();
  };

  const toggleVisible = () => {
    setVisible(!invisible);
  };

  const getEndAdornment = (field: any) => {
    if (clearable) {
      return (
        <InputAdornment
          position={"end"}
          onClick={() => handleClearInput(field)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <CrossIcon />
        </InputAdornment>
      );
    } else if (isSecure) {
      return (
        <InputAdornment
          position={"end"}
          onClick={toggleVisible}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          {invisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </InputAdornment>
      );
    }
  };

  const errorInfo = useCallback(() => {
    return errors?.[name];
  }, [errors, name]);

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            size={size}
            inputRef={inputRef}
            value={field.value ?? ""}
            placeholder={placeholder}
            error={!!errorInfo?.() && !disabled}
            helperText={
              !disabled && !!errorInfo()
                ? errorInfo()?.message?.toString()
                : null
            }
            fullWidth
            type={invisible && isSecure ? "password" : type || "text"}
            label={label}
            multiline={multiline}
            variant="filled"
            disabled={disabled}
            InputProps={{
              endAdornment: getEndAdornment(field),
            }}
            onKeyPress={onKeyPress}
          />
        )}
      />
    </Fragment>
  );
};

export default InputField;
