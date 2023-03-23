import { Toolbar, Typography, Tooltip, Button } from "@mui/material";
import { alpha, Box } from "@mui/system";
import SearchInput from "shared/components/SearchInput";
import { IEnhancedToolbar } from "../constants";
import FilterListIcon from "@heroicons/react/24/solid/AdjustmentsHorizontalIcon";
import ExportIcon from "@heroicons/react/24/solid/CircleStackIcon";
import { Fragment } from "react";

const EnhancedToolbar = ({
  rowsSelected,
  handleToggleFilter,
  filterOptions,
  onExport,
  fetchData,
  hasFilters,
  hasSearchInput,
}: IEnhancedToolbar) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 4 },
        pr: { xs: 1, sm: 2 },
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
        <Button
          variant="contained"
          onClick={onExport}
          startIcon={<ExportIcon height={24} width={24} />}
        >
          <Typography>Export</Typography>
        </Button>
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
