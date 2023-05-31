import BasicTable from "shared/ui/Table";
import { ICampaignLog } from "store/interfaces/campaigns";
import { historyColumns } from "../constants";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface ICampaignLogWithId extends ICampaignLog {
  id: number;
}

const HistoryView = ({ data }: { data: ICampaignLog[] }) => {
  const navigate = useNavigate();

  const handleRedirect = (id: number) => {
    navigate("/admin/users", {
      state: {
        id,
      },
    });
  };

  const userIdColumn = {
    layout: (row: ICampaignLog) => {
      return (
        <Typography
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
          onClick={() => handleRedirect(row.userId)}
        >
          {row.username}
        </Typography>
      );
    },
    label: "name",
  };

  return (
    <BasicTable<ICampaignLogWithId>
      enablePagination={false}
      sortable={false}
      toolbar={false}
      data={data.map((i) => ({ ...i, id: i.userId }))}
      columns={[...historyColumns, userIdColumn]}
    />
  );
};

export default HistoryView;
