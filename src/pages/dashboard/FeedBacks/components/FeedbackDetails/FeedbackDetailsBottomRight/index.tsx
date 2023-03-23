import { feedbackDetailsBottomRightTabsOptions } from "./constants";
import BasicTabs from "shared/ui/Tabs";

type Props = {};

const FeedbackDetailsBottomRight = (props: Props) => {
  return (
    <div>
      <BasicTabs tabsData={feedbackDetailsBottomRightTabsOptions} />
    </div>
  );
};

export default FeedbackDetailsBottomRight;
