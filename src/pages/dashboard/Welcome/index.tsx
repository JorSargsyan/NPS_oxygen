import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import useTranslation from "shared/helpers/hooks/useTranslation";

const Welcome = () => {
  const t = useTranslation();
  return (
    <Box
      sx={{
        textTransform: "uppercase",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      p={4}
    >
      <Typography variant="h3" fontWeight={500} color="text.secondary">
        {t("welcome_text")}
      </Typography>
    </Box>
  );
};

export default Welcome;
