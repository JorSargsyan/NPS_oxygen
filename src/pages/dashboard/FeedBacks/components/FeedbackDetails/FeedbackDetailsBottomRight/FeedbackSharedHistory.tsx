import { Avatar, Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, ReactNode } from "react";
import { EBaseUrl } from "store/config/constants";
import { IFeedbackUser } from "store/interfaces/feedback";
import { CardContentNoPadding } from "./TabNotesComponent";

interface IProps<T> {
  list: T[];
  children?: (item: T) => JSX.Element;
}

const FeedBackSharedHistoryComponent = <
  T extends {
    id: number;
    user: IFeedbackUser;
    creationDate: string;
    note?: string;
  }
>({
  list,
  children,
}: IProps<T>) => {
  return (
    <Fragment>
      {list?.length
        ? list.map((item: T) => {
            return (
              <Card key={item.id} sx={{ marginBottom: 2 }}>
                <CardContentNoPadding>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    pb={1}
                  >
                    <Box display="flex" alignItems="center">
                      <Box mr={1}>
                        {item?.user?.imagePath ? (
                          <Avatar
                            sx={{
                              height: 40,
                              width: 40,
                            }}
                            src={
                              EBaseUrl.MediaUserURL
                                ? `${EBaseUrl.MediaUserURL}/${item?.user?.imagePath}`
                                : "/assets/avatars/avatar-anika-visser.png"
                            }
                          />
                        ) : (
                          <Avatar
                            sx={{
                              height: 40,
                              width: 40,
                              backgroundColor: "primary.main",
                            }}
                          >
                            {item?.user?.name.slice(0, 1)}
                          </Avatar>
                        )}
                      </Box>
                      <Box>
                        <Box fontSize={12}>
                          {`${item?.user?.name} ${item?.user?.surname}`}
                        </Box>
                        <Typography fontSize={12}>
                          {item?.creationDate}
                        </Typography>
                      </Box>
                    </Box>
                    <Box></Box>
                  </Box>
                  <Divider />
                  <Typography fontSize={14}>
                    {children ? children(item) : item?.note}
                  </Typography>
                </CardContentNoPadding>
              </Card>
            );
          })
        : null}
    </Fragment>
  );
};

export default FeedBackSharedHistoryComponent;
