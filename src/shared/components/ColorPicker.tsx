import { Box, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, onChange, name }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleChange = (color) => {
    onChange(name, color);
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton onClick={handleOpen}>
        <Box
          height={25}
          width={25}
          sx={{
            backgroundColor: color,
            borderRadius: "4px",
            cursor: "pointer",
          }}
        />
      </IconButton>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <SketchPicker color={color} onChange={handleChange} />
      </Popover>
    </Box>
  );
};

export default ColorPicker;
