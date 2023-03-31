import { Box } from "@mui/system";
import { requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";

const SimpleForm = () => {
  return (
    <Box>
      <TextInput
        name="title"
        placeholder={"Type your text here"}
        label="Title"
        rules={requiredRules}
      />
    </Box>
  );
};
export default SimpleForm;
