import { Box, TableCell, TableRow, Typography } from "@mui/material";
import SmileIcon from "@heroicons/react/24/outline/FaceSmileIcon";

const NoRows = () => {
  return (
    <TableRow>
      <TableCell>
        <Box display="flex">
          <Typography ml={2} fontSize={14} textAlign={"left"}>
            Nothing found, try to change filters
          </Typography>
          <Box ml={1} mt={0.2}>
            <SmileIcon height={18} />
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default NoRows;
