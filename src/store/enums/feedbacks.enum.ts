enum EScore {
  NPS = 5,
  ES = 6,
  Custom = 7,
  CustomRating = 10,
  CustomerEffortScore = 11,
  CustomerSatisfactionScore = 12,
}

const EScoreTypes = {
  [EScore.NPS]: "NPS",
  [EScore.ES]: "eNPS",
  [EScore.Custom]: "Custom",
  [EScore.CustomRating]: "Rating",
  [EScore.CustomerEffortScore]: "CES",
  [EScore.CustomerSatisfactionScore]: "CSAT",
};

enum EFeedbackStatus {
  New = 1,
  Follow_Up,
  Postponed,
  No_response,
  Resolved,
  Not_Resolved,
  Misrated,
  Archived,
}

enum EFeedbackStatusesModalTypes {
  Requires_Cause = 1,
  Requires_Both = 2,
}

enum EMood {
  Good = "1",
  Neutral = "2",
  Bad = "3",
}

export {
  EScore,
  EScoreTypes,
  EFeedbackStatus,
  EFeedbackStatusesModalTypes,
  EMood,
};
