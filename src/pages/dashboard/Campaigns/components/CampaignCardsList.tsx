import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Switch,
  Table,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useCallback } from "react";
import DotsMenu from "shared/ui/DotsMenu";
import TablePaginationActions from "shared/ui/Table/components/TablePAginationActions";
import {
  IAction,
  IFilterOptions,
  rowsPerPageOptions,
} from "shared/ui/Table/constants";
import { ICampaign } from "store/interfaces/campaigns";
import { IPaginated } from "store/interfaces/main";

type Props = {
  list: IPaginated<ICampaign>;
  actions: any;
  handleChangeState: (id: number, checked: boolean) => void;
  filterOptions: IFilterOptions;
  onChange: () => void;
};

const CardContentNoPadding = styled(CardContent)(`
  padding: 20px;
  &:last-child {
    padding-bottom: 20px;
  }
`);

const StyledBox = styled(Box)(`
    display: flex;
    justify-content: space-between;
    align-items: center;
`);

const LoadingSkeleton = () => (
  <Box
    sx={{
      display: "flex",
      gap: "18px",
      flexWrap: "wrap",
      paddingTop: 4,
    }}
  >
    {[...Array(6)].map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        sx={{
          my: 2,
          mx: 1,
          height: "280px",
          width: "30%",
          borderRadius: "20px",
        }}
      />
    ))}
  </Box>
);

const CampaignCardsList = ({
  list,
  actions,
  handleChangeState,
  filterOptions,
  onChange,
}: Props) => {
  const filters = filterOptions?.watch("config");

  const handleClickAction = useCallback(
    (action: IAction<ICampaign>, row: ICampaign) => {
      action?.onClick(row);
    },
    []
  );

  const handlePageChange = (_: any, pageNumber: number) => {
    filterOptions?.reset({
      ...filterOptions.watch(),
      config: {
        ...filters,
        start: pageNumber * filters?.length,
      },
    });
    onChange?.();
  };

  const handleRowsPerPageChange = (e: any) => {
    const value = e.target.value;
    filterOptions?.reset({
      ...filterOptions.watch(),
      config: {
        ...filters,
        length: value,
      },
    });
    onChange?.();
  };

  return (
    <Fragment>
      {list?.displayData?.length ? (
        <Box
          sx={{ display: "flex", gap: "18px", flexWrap: "wrap", paddingTop: 4 }}
        >
          {list?.displayData?.map((item: ICampaign) => {
            return (
              <Box key={item.id} sx={{ width: "23%", position: "relative" }}>
                <Card>
                  <CardContentNoPadding>
                    <Box
                      display="flex"
                      minHeight="180px"
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"16px"}
                      sx={{ backgroundColor: "#FBDA69" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        fontWeight={"normal"}
                        component="div"
                        width="85%"
                        textAlign={"center"}
                      >
                        {item.name}
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          right: 20,
                          top: 30,
                        }}
                      >
                        <DotsMenu<ICampaign>
                          actions={actions(item)}
                          onActionClick={handleClickAction}
                          row={item}
                        />
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent={"space-between"}>
                      <StyledBox>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          {item.responded || "No"} responses
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        ></Typography>
                      </StyledBox>
                      <StyledBox>
                        <Switch
                          onChange={(e, checked) =>
                            handleChangeState(item.id, checked)
                          }
                          checked={item.isActive}
                        />
                      </StyledBox>
                    </Box>
                  </CardContentNoPadding>
                </Card>
              </Box>
            );
          })}
          <Table>
            <TableFooter
              sx={{
                "& p": {
                  marginBottom: 0,
                },
              }}
            >
              <TableRow>
                <TablePagination
                  component="td"
                  count={list?.totalRecords}
                  rowsPerPage={filters?.length}
                  rowsPerPageOptions={rowsPerPageOptions}
                  page={filters?.start / filters?.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      ) : (
        <LoadingSkeleton />
      )}
    </Fragment>
  );
};

export default CampaignCardsList;
