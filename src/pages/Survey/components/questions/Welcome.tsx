import { Box } from "@mui/system";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { selectQuestion } from "store/slicers/surveyPreview";

const WelcomeQuestion = () => {
  const questionData = useSelector(selectQuestion);
  return <Box>{/* <Typography>{questionData.}</Typography> */}</Box>;
};

export default WelcomeQuestion;
