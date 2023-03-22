enum EScore {
  NPS = 5,
  ES,
  Custom,
}

const EScoreTypes = {
  [EScore.NPS]: "NPS",
  [EScore.ES]: "ES",
};

export { EScore, EScoreTypes };
