import { Box, Typography } from "@mui/material";
import { IComments } from "store/interfaces/feedback";

type Props = {
  editData: { id: number; data: IComments[] };
};

const ViewComments = ({ editData }: Props) => {
  return (
    <Box>
      {editData.data.map((comment: IComments, index) => {
        return (
          <Box
            key={index}
            sx={{
              border: "2px solid",
              borderRadius: 1,
              padding: "12px",
              borderColor: "primary.main",
            }}
          >
            <Typography pb={2}>{comment.title}</Typography>
            <Typography>{comment.answer}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ViewComments;
