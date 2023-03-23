import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectFeedbackDetails } from "store/slicers/feedback";

type Props = {};

const TabServiceComponent = (props: Props) => {
  const feedbackItemDetails = useSelector(selectFeedbackDetails);
  const { service } = feedbackItemDetails;

  return (
    <Box
      display="grid"
      sx={{
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "2fr 2fr",
      }}
      p={3}
    >
      {service?.employeeName ? (
        <Box mr={1}>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Employee name
          </Typography>
          <Typography mb={2}>{service?.employeeName}</Typography>
        </Box>
      ) : null}
      {service?.employeeEmail ? (
        <Box mr={1}>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Employee email
          </Typography>
          <Typography mb={2}>{service?.employeeEmail}</Typography>
        </Box>
      ) : null}
      {service?.employeePosition ? (
        <Box mr={1}>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Employee position
          </Typography>
          <Typography mb={2}>{service?.employeePosition}</Typography>
        </Box>
      ) : null}
      {service?.employeeCode ? (
        <Box mr={1}>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Employee code
          </Typography>
          <Typography mb={2}>{service?.employeeCode}</Typography>
        </Box>
      ) : null}
      {service?.serviceCategory ? (
        <Box mr={1}>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Service category
          </Typography>
          <Typography mb={2}>{service?.serviceCategory}</Typography>
        </Box>
      ) : null}
      {service?.serviceDate ? (
        <Box mr={1}>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Service date
          </Typography>
          <Typography mb={2}>{service?.serviceDate}</Typography>
        </Box>
      ) : null}
      {service?.transactionId ? (
        <Box mr={1}>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Transaction ID
          </Typography>
          <Typography mb={2}>{service?.transactionId}</Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default TabServiceComponent;