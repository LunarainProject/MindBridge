import ActionTypes from "../actions/ActionTypes";
import { CardActions, SetOverviewAction, SetSurveyAction, SetTipAction } from "../actions/CardActions";
import { CardState } from "../StateTypes";

export default (
  state: CardState = {
    OverviewSurveyCategory: {
      Title: "테스트",
      Cards: [],
    },
    OverviewVideoCategory: {
      Title: "추천 영상",
      Cards: [],
    },
    OverviewColumnCategory: {
      Title: "추천 칼럼",
      Cards: [],
    },
    SurveyCategories: [
      {
        Title: "테스트1",
        Cards: [],
      },
      {
        Title: "테스트2",
        Cards: [],
      },
    ],
    TipVideoCategory: {
      Title: "실전 팁 영상",
      Cards: [],
    },

    TipCategory: {
      Title: "실전 팁 칼럼",
      Cards: [],
    },
  },
  action: CardActions
) => {
  switch (action.type) {
    case ActionTypes.SET_SURVEY:
      state = {...state, SurveyCategories: (action as SetSurveyAction).surveys}
      return state;
    case ActionTypes.SET_OVERVIEW:
      const { survey: OverviewSurveyCategory, video: OverviewVideoCategory, column: OverviewColumnCategory } = (action as SetOverviewAction);
      state = {...state, OverviewSurveyCategory, OverviewColumnCategory, OverviewVideoCategory };
      return state;
    case ActionTypes.SET_TIP:
      const { column: TipCategory, video: TipVideoCategory } = (action as SetTipAction);
      state = {...state, TipCategory, TipVideoCategory}
      return state;
    default:
      return state;
  }
};

