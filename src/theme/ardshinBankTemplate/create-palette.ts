import { common } from "@mui/material/colors";
import { PaletteOptions, alpha } from "@mui/material/styles";
import { error, info, neutral, success, warning } from "../colors";

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const indigo = withAlphas({
  main: "#183794",
  dark: "#142b6e",
  darkest: "#222D43",
  selected: "#3EB84F",
  contrastText: "#FFFFFF",
  lightText: "#999999",
  black: "#212121",
  ratingBackground: "#F5F5F5",
});

interface ICreatePalette extends PaletteOptions {
  neutral: { [key: number]: string };
}
export function createPalette(): ICreatePalette {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: common.white,
      paper: common.white,
    },
    divider: "#F2F4F7",
    error,
    info,
    mode: "light",
    neutral,
    primary: indigo,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
}
