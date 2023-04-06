enum EScore {
  NPS = 5,
  ES,
  Custom,
}

const EScoreTypes = {
  [EScore.NPS]: "NPS",
  [EScore.ES]: "ES",
  [EScore.Custom]: "Custom",
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
