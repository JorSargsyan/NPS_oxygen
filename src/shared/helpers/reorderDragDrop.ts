import { ICampaignSurvey } from "store/interfaces/campaignDetails";

const reorderDragDrop = (
  list: ICampaignSurvey[],
  startIndex: number,
  endIndex: number
): ICampaignSurvey[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => {
    return {
      ...item,
      position: index !== result.length - 1 ? index : item.position,
    };
  });
};

export default reorderDragDrop;
