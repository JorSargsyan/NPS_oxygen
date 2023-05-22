import {
  debounce,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
} from "@mui/material";
import { IFilterOptions } from "shared/ui/Table/constants";
import SearchIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import useTranslation from "shared/helpers/hooks/useTranslation";

type Props = {
  filterOptions: IFilterOptions;
  fetchData: () => void;
};

const SearchInput = ({ filterOptions, fetchData }: Props) => {
  const t = useTranslation();

  const handleSearch = (e) => {
    filterOptions?.reset({
      ...filterOptions?.watch(),
      config: {
        ...filterOptions?.watch("config"),
        search: e.target.value,
      },
    });
    fetchData?.();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} pb={1} pt={1}>
        <TextField
          label=""
          fullWidth
          size="medium"
          placeholder={t("search")}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position={"start"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={debounce(handleSearch, 600)}
        />
      </Grid>
    </Grid>
  );
};

export default SearchInput;
