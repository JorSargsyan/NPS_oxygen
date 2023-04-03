import { Slider, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  min?: number;
  max?: number;
  disableSwap?: boolean;
  sx?: any;
  label?: string;
  values?: number[];
};

const RangeSlider = (props: Props) => {
  const {
    name,
    min = 0,
    max = 10,
    disableSwap = true,
    sx,
    label = "Score",
    values = [0, 10],
  } = props;
  const { control } = useFormContext();

  const handleChange = (event, newValue, field) => {
    field.onChange(newValue);
  };

  return (
    <>
      <Typography id="input-slider">{`${label} :  ${
        values?.[0] ? values?.[0] : "0"
      } - ${values?.[1] ? values?.[1] : "10"}`}</Typography>
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
    </>
  );
};

export default RangeSlider;
