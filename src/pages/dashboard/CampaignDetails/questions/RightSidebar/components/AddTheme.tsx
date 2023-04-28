import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ColorPicker from "shared/components/ColorPicker";

const AddTheme = ({ onSuccess }: { onSuccess }) => {
  const [colors, setColors] = useState({
    button: "#000000",
    buttonText: "#000000",
    question: "#000000",
    answer: "#000000",
  });

  const handleChange = (name: string, { hex }) => {
    setColors((state) => {
      return {
        ...state,
        [name]: hex,
      };
    });
  };

  console.log(colors);
  return (
    <Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Question Color</Typography>
        <ColorPicker
          name="question"
          color={colors.question}
          onChange={handleChange}
        />
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Answer Color</Typography>
        <ColorPicker
          name="answer"
          color={colors.answer}
          onChange={handleChange}
        />
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Button Color</Typography>
        <ColorPicker
          name="button"
          color={colors.button}
          onChange={handleChange}
        />
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Button text Color</Typography>
        <ColorPicker
          name="buttonText"
          color={colors.buttonText}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default AddTheme;
