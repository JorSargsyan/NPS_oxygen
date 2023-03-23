import { Toolbar, Typography, Tooltip } from "@mui/material";
import { alpha, Box } from "@mui/system";
import SearchInput from "shared/components/SearchInput";
import { IEnhancedToolbar } from "../constants";
import FilterListIcon from "@heroicons/react/24/solid/AdjustmentsHorizontalIcon";
import DeleteIcon from "@heroicons/react/24/solid/TrashIcon";
import { Fragment } from "react";

const EnhancedToolbar = ({
  rowsSelected,
  handleToggleFilter,
  filterOptions,
  fetchData,
  hasFilters,
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
        <Fragment>
          {hasFilters && (
            <Tooltip title="Filter list">
              <FilterListIcon
                onClick={handleToggleFilter}
                height={24}
                width={24}
              />
            </Tooltip>
          )}
        </Fragment>
      )}
    </Toolbar>
  );
};

export default EnhancedToolbar;
