import { useSelector } from "react-redux";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import usePermission from "shared/helpers/hooks/usePermission";
import BasicAutocomplete from "shared/ui/Autocomplete";
import { selectCauseCategories } from "store/slicers/feedback";

const RootCauseCategoriesAutocomplete = () => {
  const causeCategoriesList = useSelector(selectCauseCategories);
  const hasChangePermission = usePermission(
    EFeedbackPermissions.Select_root_cause_mood
  );
  return (
    <BasicAutocomplete<any>
      name="causeCategories"
      options={causeCategoriesList}
      inputLabel={"Cause categories"}
      disabled={!hasChangePermission}
      multiple
      defaultValue={[]}
      prefix="permissions"
      optionLabel="rootCauseName"
      groupBy={(option) => option.causeCategoryName}
    />
  );
};

export default RootCauseCategoriesAutocomplete;
