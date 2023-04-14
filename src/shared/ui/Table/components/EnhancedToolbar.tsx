import { Toolbar, Typography, Tooltip, Button, SvgIcon } from "@mui/material";
import { alpha, Box } from "@mui/system";
import SearchInput from "shared/components/SearchInput";
import { IEnhancedToolbar } from "../constants";
import FilterListIcon from "@heroicons/react/24/solid/AdjustmentsHorizontalIcon";
import ExportIcon from "@heroicons/react/24/solid/CircleStackIcon";
import QuickFilterIcon from "@heroicons/react/24/outline/FunnelIcon";

const EnhancedToolbar = ({
  rowsSelected,
  handleToggleFilter,
  filterOptions,
  onExport,
  fetchData,
  hasFilters,
  hasSearchInput,
  hasCustomActions = false,
}: IEnhancedToolbar) => {
  return (
    <Toolbar
      sx={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        pl: { sm: 1.3 },
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
      {rowsSelected > 0 && !hasCustomActions ? (
        <Button
          variant="contained"
          onClick={() => onExport?.()}
          startIcon={<ExportIcon height={24} width={24} />}
        >
          <Typography>Export</Typography>
        </Button>
      ) : (
        <Box>
          {hasFilters && (
            <Tooltip title="Filter list">
              <SvgIcon onClick={handleToggleFilter} sx={{ cursor: "pointer" }}>
                <QuickFilterIcon height={24} width={24} />
              </SvgIcon>
            </Tooltip>
          )}
        </Box>
      )}
    </Toolbar>
  );
};

export default EnhancedToolbar;
