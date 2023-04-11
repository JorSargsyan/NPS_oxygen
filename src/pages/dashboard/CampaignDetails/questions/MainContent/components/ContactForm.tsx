import { Box } from "@mui/system";
import { emailRule, requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";

const ContactForm = () => {
  return (
    <Box>
      <Box my={2}>
        <TextInput
          name="title"
          placeholder={"Type your text here"}
          label="Title"
          rules={requiredRules}
        />
      </Box>
    </Box>
  );
};
export default ContactForm;
