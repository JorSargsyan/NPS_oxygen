import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import useTranslation from "shared/helpers/hooks/useTranslation";
import { selectFeedbackDetails } from "store/slicers/feedback";
import NoData from "../../NoData";

const TabServiceComponent = () => {
  const feedbackItemDetails = useSelector(selectFeedbackDetails);
  const { service } = feedbackItemDetails;
  const t = useTranslation();

  return (
    <Box
      display="grid"
      sx={{
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "2fr 2fr",
      }}
      p={3}
    >
      {!service && <NoData description="There is no data" />}
      {service?.employeeName ? (
        <Box mr={1}>
          <Typography fontSize={14} mb={1} fontWeight="bold">
            {t("employee_name")}
          </Typography>
          <Typography mb={2}>{service?.employeeName}</Typography>
        </Box>
      ) : null}
      {service?.employeeEmail ? (
        <Box mr={1}>
          <Typography fontSize={14} mb={1} fontWeight="bold">
            {t("employee_email")}
          </Typography>
          <Typography mb={2}>{service?.employeeEmail}</Typography>
        </Box>
      ) : null}
      {service?.employeePosition ? (
        <Box mr={1}>
          <Typography fontSize={14} mb={1} fontWeight="bold">
            {t("employee_position")}
          </Typography>
          <Typography mb={2}>{service?.employeePosition}</Typography>
        </Box>
      ) : null}
      {service?.employeeCode ? (
        <Box mr={1}>
          <Typography fontSize={14} mb={1} fontWeight="bold">
            {t("employee_code")}
          </Typography>
          <Typography mb={2}>{service?.employeeCode}</Typography>
        </Box>
      ) : null}
      {service?.serviceCategory ? (
        <Box mr={1}>
          <Typography fontSize={14} mb={1} fontWeight="bold">
            {t("service_category")}
          </Typography>
          <Typography mb={2}>{service?.serviceCategory}</Typography>
        </Box>
      ) : null}
      {service?.serviceDate ? (
        <Box mr={1}>
          <Typography fontSize={14} mb={1} fontWeight="bold">
            {t("service_date")}
          </Typography>
          <Typography mb={2}>{service?.serviceDate}</Typography>
        </Box>
      ) : null}
      {service?.transactionId ? (
        <Box mr={1}>
          <Typography fontSize={14} mb={1} fontWeight="bold">
            {t("transaction_id")}
          </Typography>
          <Typography mb={2}>{service?.transactionId}</Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default TabServiceComponent;
