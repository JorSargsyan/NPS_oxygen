import styled from "@emotion/styled";
import CreditCard from "@heroicons/react/24/solid/CreditCardIcon";
import GridIcon from "@heroicons/react/24/solid/TableCellsIcon";
import {
  SvgIcon,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { ECampaignListViewTypes } from "..";

const MyThemeComponent = styled(ToggleButton)(({ theme }) =>
  theme.unstable_sx({
    color: "primary.main",
    border: "1px solid",
    borderColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.light",
      color: "white",
    },
    "&.Mui-selected": {
      backgroundColor: "primary.main",
      color: "white",
      "&:hover": {
        backgroundColor: "primary.light",
        color: "white",
      },
    },
  })
);

const CampaignListViewTypes = ({
  type,
  setType,
}: {
  type: ECampaignListViewTypes;
  setType: (type: ECampaignListViewTypes) => void;
}) => {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: ECampaignListViewTypes | null
  ) => {
    if (newAlignment !== null) {
      setType(newAlignment);
    }
  };

  return (
    <Fragment>
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <MyThemeComponent
          value={ECampaignListViewTypes.Card}
          selected={type === ECampaignListViewTypes.Card}
        >
          <SvgIcon fontSize="small">
            <CreditCard />
          </SvgIcon>
          <Typography sx={{ marginLeft: 1 }}>Card</Typography>
        </MyThemeComponent>
        <MyThemeComponent
          value={ECampaignListViewTypes.Grid}
          selected={type === ECampaignListViewTypes.Grid}
        >
          <SvgIcon fontSize="small">
            <GridIcon />
          </SvgIcon>
          <Typography sx={{ marginLeft: 1 }}>Grid</Typography>
        </MyThemeComponent>
      </ToggleButtonGroup>
    </Fragment>
  );
};

export default CampaignListViewTypes;
