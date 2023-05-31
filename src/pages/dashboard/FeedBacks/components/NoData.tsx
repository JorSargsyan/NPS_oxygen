import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import SmileIcon from "@heroicons/react/24/outline/FaceSmileIcon";
import useTranslation from "shared/helpers/hooks/useTranslation";

type Props = { description: string };

const NoData = ({ description }: Props) => {
  const t = useTranslation();
  return (
    <Box display="flex">
      <Typography ml={2} fontSize={14} textAlign={"left"}>
        {t(description)}
      </Typography>
      <Box ml={1} mt={0.2}>
        <SmileIcon height={18} />
      </Box>
    </Box>
  );
};

export default NoData;
