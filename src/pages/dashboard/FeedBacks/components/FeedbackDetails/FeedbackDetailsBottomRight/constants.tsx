import TabHistoryComponent from "./TabHistoryComponent";
import TabNotesComponent from "./TabNotesComponent";
import TabRedirectionComponent from "./TabRedirectionComponent";
import TabRootCauseComponent from "./TabRootCauseComponent";

export enum EFeedbackDetailsBottomRightTabsOptions {
  Notes = 0,
  Redirection,
  Root_cause,
  History,
}

export const feedbackDetailsBottomRightTabsOptions = [
  {
    index: EFeedbackDetailsBottomRightTabsOptions.Notes,
    label: "Notes",
    children: <TabNotesComponent />,
  },
  {
    index: EFeedbackDetailsBottomRightTabsOptions.Redirection,
    label: "Redirection",
    children: <TabRedirectionComponent />,
  },
  {
    index: EFeedbackDetailsBottomRightTabsOptions.Root_cause,
    label: "Root_cause",
    children: <TabRootCauseComponent />,
  },
  {
    index: EFeedbackDetailsBottomRightTabsOptions.History,
    label: "History",
    children: <TabHistoryComponent />,
  },
];
