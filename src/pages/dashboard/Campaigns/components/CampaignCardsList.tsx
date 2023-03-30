import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import { Fragment, useCallback } from "react";
import DotsMenu from "shared/ui/DotsMenu";
import { IAction } from "shared/ui/Table/constants";
import { ICampaign } from "store/interfaces/campaigns";

type Props = {
  list: ICampaign[];
  actions: any;
  handleChangeState: (id: number, checked: boolean) => void;
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

const CampaignCardsList = ({ list, actions, handleChangeState }: Props) => {
  const handleClickAction = useCallback(
    (action: IAction<ICampaign>, row: ICampaign) => {
      action?.onClick(row);
    },
    []
  );

  return (
    <Fragment>
      {list?.length ? (
        <Box
          sx={{ display: "flex", gap: "18px", flexWrap: "wrap", paddingTop: 4 }}
        >
          {list?.map((item: ICampaign) => {
            return (
              <Box key={item.id} sx={{ width: "31%", position: "relative" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContentNoPadding>
                    <StyledBox>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        width="85%"
                      >
                        {item.name}
                      </Typography>
                      <Box sx={{ position: "absolute", right: -7, top: 12 }}>
                        <DotsMenu<ICampaign>
                          actions={actions(item)}
                          onActionClick={handleClickAction}
                          row={item}
                        />
                      </Box>
                    </StyledBox>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: 13, fontWeight: 600 }}
                    >
                      Created on {item.creationDate}
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: 13, fontWeight: 600, pt: 1 }}
                    >
                      Delivery statistics
                    </Typography>
                    <Box>
                      <StyledBox>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Sent
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.sent}
                        </Typography>
                      </StyledBox>

                      <StyledBox>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Delivered
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.delivered}
                        </Typography>
                      </StyledBox>
                      <StyledBox>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Opened
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.opened}
                        </Typography>
                      </StyledBox>
                      <StyledBox>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Responded
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.responded}
                        </Typography>
                      </StyledBox>
                      <StyledBox>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Bounced
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.bounced}
                        </Typography>
                      </StyledBox>
                    </Box>
                    <StyledBox>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, pt: 1 }}>
                        Change survey state
                      </Typography>
                      <Switch
                        onChange={(e, checked) =>
                          handleChangeState(item.id, checked)
                        }
                        checked={item.isActive}
                      />
                    </StyledBox>
                  </CardContentNoPadding>
                </Card>
              </Box>
            );
          })}
        </Box>
      ) : (
        <LoadingSkeleton />
      )}
    </Fragment>
  );
};

export default CampaignCardsList;
