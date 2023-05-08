import { IconButton, Typography, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import UploadIcon from "@heroicons/react/24/outline/ArrowUpOnSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

type Props = {
  name: string;
  img: string | ArrayBuffer;
  setImg: any;
  title: string;
};

const UploadImage = ({ name, img, setImg, title }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>();

  const handleChangeImage = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function () {
      setImg((state) => {
        return {
          ...state,
          [name]: reader.result,
        };
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadOpen = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <Typography fontSize={16} pb={1}>
        {title}
      </Typography>
      <Box
        minHeight={140}
        borderRadius={"10px"}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        sx={{ backgroundColor: "divider" }}
      >
        {img ? (
          <img
            height="100%"
            width="100%"
            style={{ borderRadius: 10 }}
            src={img?.[name]?.toString()}
            alt="templateImage"
          />
        ) : (
          <Typography fontSize={18}>No image</Typography>
        )}
      </Box>
      <Box display="flex" justifyContent={"flex-end"}>
        <Tooltip title={"Upload / Change Image"}>
          <IconButton onClick={handleFileUploadOpen}>
            <UploadIcon height={20} />
          </IconButton>
        </Tooltip>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg"
          onChange={handleChangeImage}
          hidden
        />
        {/* <Tooltip title={"Remove Image"}>
            <IconButton onClick={handleRemoveImage}>
              <TrashIcon height={20} />
            </IconButton>
          </Tooltip> */}
      </Box>
    </Box>
  );
};

export default UploadImage;
