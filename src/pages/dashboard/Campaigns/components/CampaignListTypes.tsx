import CreditCard from "@heroicons/react/24/solid/CreditCardIcon";
import GridIcon from "@heroicons/react/24/solid/TableCellsIcon";
import { SvgIcon, ToggleButtonGroup, Typography } from "@mui/material";
import { Fragment } from "react";
import StyledToggleButton from "shared/ui/ToggleButton";
import { ECampaignListViewTypes } from "..";

const CampaignListViewTypes = ({
  type,
  setType,
}: {
  type: ECampaignListViewTypes;
  setType: (type: ECampaignListViewTypes) => void;
}) => {
  const chooseType = (
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
        onChange={chooseType}
        aria-label="text alignment"
      >
        <StyledToggleButton
          value={ECampaignListViewTypes.Card}
          selected={type === ECampaignListViewTypes.Card}
        >
          <SvgIcon fontSize="small">
            <CreditCard />
          </SvgIcon>
          <Typography sx={{ marginLeft: 1 }}>Card</Typography>
        </StyledToggleButton>
        <StyledToggleButton
          value={ECampaignListViewTypes.Grid}
          selected={type === ECampaignListViewTypes.Grid}
        >
          <SvgIcon fontSize="small">
            <GridIcon />
          </SvgIcon>
          <Typography sx={{ marginLeft: 1 }}>Grid</Typography>
        </StyledToggleButton>
      </ToggleButtonGroup>
    </Fragment>
  );
};

export default CampaignListViewTypes;
