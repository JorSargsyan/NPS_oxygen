import { Toolbar, Typography, Tooltip } from "@mui/material";
import { alpha, Box } from "@mui/system";
import SearchInput from "shared/components/SearchInput";
import { IEnhancedToolbar } from "../constants";
import FilterListIcon from "@heroicons/react/24/solid/AdjustmentsHorizontalIcon";
import DeleteIcon from "@heroicons/react/24/solid/TrashIcon";

const EnhancedToolbar = ({
  rowsSelected,
  filterOptions,
  fetchData,
  hasSearchInput,
}: IEnhancedToolbar) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        ...(rowsSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {rowsSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {rowsSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%" }}>
          {hasSearchInput ? (
            <SearchInput filterOptions={filterOptions} fetchData={fetchData} />
          ) : null}
        </Box>
      )}
      {rowsSelected > 0 ? (
        <Tooltip title="Delete">
          <DeleteIcon height={24} width={24} />
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <FilterListIcon height={24} width={24} />
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedToolbar;
