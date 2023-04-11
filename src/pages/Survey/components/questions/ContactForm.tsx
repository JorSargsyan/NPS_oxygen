import { Box } from "@mui/system";
import { emailRule, requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";

const ContactQuestion = () => {
  return (
    <Box pt={4}>
      <Box my={2}>
        <TextInput
          name="contactConfig.firstName"
          label="First name"
          rules={requiredRules}
        />
      </Box>
      <Box my={2}>
        <TextInput
          name="contactConfig.lastName"
          label="Last name"
          rules={requiredRules}
        />
      </Box>
      <Box my={2}>
        <TextInput
          name="contactConfig.phone"
          label="Phone number"
          type="number"
          rules={requiredRules}
        />
      </Box>
      <Box my={2}>
        <TextInput
          name="contactConfig.email"
          label="Email"
          rules={{ ...requiredRules, ...emailRule }}
        />
      </Box>
    </Box>
  );
};

export default ContactQuestion;
