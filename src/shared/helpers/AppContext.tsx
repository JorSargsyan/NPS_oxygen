export const appContextInitialState: IInitialState = {
  campaignDetails: {
    isOpen: false,
  },
};

export const AppReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case EAppReducerTypes.Set_unsaved_modal_open:
      return {
        ...state,
        campaignDetails: {
          ...state.campaignDetails,
          isOpen: payload,
        },
      };
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};

interface IInitialState {
  campaignDetails: {
    isOpen: boolean;
  };
}

export enum EAppReducerTypes {
  Set_unsaved_modal_open = "is_campaign_details_modal)open",
}
