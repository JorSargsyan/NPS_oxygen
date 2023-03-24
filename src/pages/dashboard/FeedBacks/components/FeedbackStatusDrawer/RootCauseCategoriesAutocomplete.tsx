import { useSelector } from "react-redux";
import BasicAutocomplete from "shared/ui/Autocomplete";
import { selectCauseCategories } from "store/slicers/feedback";

const RootCauseCategoriesAutocomplete = () => {
  const causeCategoriesList = useSelector(selectCauseCategories);
  return (
    <BasicAutocomplete<any>
      name="causeCategories"
      options={causeCategoriesList}
      inputLabel={"Cause categories"}
      multiple
      defaultValue={[]}
      prefix="permissions"
      optionLabel="rootCauseName"
      groupBy={(option) => option.causeCategoryName}
    />
  );
};

export default RootCauseCategoriesAutocomplete;
