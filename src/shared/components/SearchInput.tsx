import { debounce, InputAdornment, SvgIcon, TextField } from "@mui/material";
import { IFilterOptions } from "shared/ui/Table/constants";
import SearchIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Box } from "@mui/system";

type Props = {
  filterOptions: IFilterOptions;
  fetchData: () => void;
};

const SearchInput = ({ filterOptions, fetchData }: Props) => {
  const handleSearch = (e) => {
    filterOptions?.reset({
      ...filterOptions?.watch(),
      filters: {
        ...filterOptions?.watch("filters"),
        search: e.target.value,
      },
    });
    fetchData?.();
  };

  return (
    <Box width="50%">
      <TextField
        label=""
        fullWidth
        size="medium"
        placeholder="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment
              position={"start"}
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <SvgIcon>
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
        onChange={debounce(handleSearch, 600)}
      />
    </Box>
  );
};

export default SearchInput;
