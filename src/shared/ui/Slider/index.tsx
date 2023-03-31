import { Slider } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  min?: number;
  max?: number;
  disableSwap?: boolean;
  sx?: any;
};

const RangeSlider = (props: Props) => {
  const { name, min = 0, max = 10, disableSwap = true, sx } = props;
  const { control } = useFormContext();

  const handleChange = (event, newValue, field) => {
    field.onChange(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[0, 10]}
      render={({ field }) => {
        return (
          <Slider
            {...field}
            max={max}
            sx={sx}
            min={min}
            getAriaLabel={() => "Temperature range"}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => value.toString()}
            onChange={(e, newValue) => handleChange(e, newValue, field)}
            disableSwap={disableSwap}
          />
        );
      }}
    />
  );
};

export default RangeSlider;
