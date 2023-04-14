export enum EAppReducerTypes {
  SET_UNSAVED_MODAL_DATA = "unsaved_modal_data",
}

export const appContextInitialState: IInitialState = {
  campaignDetails: {
    isOpen: false,
    isSuccess: false,
    questionId: 0,
    tabId: 0,
  },
};

export const AppReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case EAppReducerTypes.SET_UNSAVED_MODAL_DATA:
      return {
        ...state,
        campaignDetails: {
          ...state.campaignDetails,
          ...payload,
        },
      };
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};

interface IInitialState {
  campaignDetails: {
    isOpen: boolean;
    isSuccess: boolean;
    questionId: number;
    tabId: number;
  };
}
