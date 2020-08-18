import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import { CardCategoryType, CardType, LoginState } from "../StateTypes";
import ServerService from "../services/ServerService";

export type CardActions = SetSurveyAction | SetOverviewAction | SetTipAction;

export class SetSurveyAction implements IAction {
    type: string = "";
    surveys: CardCategoryType[] = [];
}
function _SetSurvey(surveys: CardCategoryType[]): SetSurveyAction{
    return {
        type: ActionTypes.SET_SURVEY,
        surveys,
    };
}

export class SetTipAction implements IAction {
    type: string = "";
    column: CardCategoryType = {
        Title: "",
        Cards: [],
    };
    video: CardCategoryType = {
        Title: "",
        Cards: [],
    };
}
function _SetTip(column: CardCategoryType, video: CardCategoryType): SetTipAction {
    return {
        type: ActionTypes.SET_TIP,
        column,
        video,
    }
}

export class SetOverviewAction implements IAction {
    type: string = "";
    survey: CardCategoryType = {
        Title: "",
        Cards: [],
    };
    video: CardCategoryType = {
        Title: "",
        Cards: [],
    };
    column: CardCategoryType = {
        Title: "",
        Cards: [],
    };
}
function _SetOverview(survey: CardCategoryType, video: CardCategoryType, column: CardCategoryType): SetOverviewAction {
    return {
        type: ActionTypes.SET_OVERVIEW,
        survey,
        video,
        column,
    }
}

const actionTypeSurveyId = 'temp-id'

export const RetrieveSurveyThunk = () => async (dispatch: Function, getState: Function) => {
    const idToken: string | null = (getState().Login as LoginState).idToken;
    const surveys = await ServerService.GetSurveyList(idToken);
    const fixedSurveys: CardCategoryType = {
        Title: "부부 행동유형 테스트",
        Cards: [
            {
                Id: actionTypeSurveyId,
                Title: "부부 행동유형 테스트",
                Subtitle: "행동이 관계에 얼마나 영향이 있을까요?",
                Description: "서로의 사고방식, 감정양식, 행동패턴 등을 더 폭 넓게 이해할 수 있습니다.",
                ButtonLabel: "무료로 테스트하기",
                InfoLabel: "40문항",
            }
        ]
    }

    dispatch(_SetSurvey([fixedSurveys, ...surveys]));
}

export const RetrieveOverviewThunk = () => async (dispatch: Function, getState: Function) => {
    const idToken: string | null = (getState().Login as LoginState).idToken;
    const surveys = await ServerService.GetSurveyList(idToken);
    const survey: CardCategoryType = {
        Title: "테스트",
        Cards: [
            {
                Id: actionTypeSurveyId,
                Title: "부부 행동유형 테스트",
                Subtitle: "행동이 관계에 얼마나 영향이 있을까요?",
                Description: "서로의 사고방식, 감정양식, 행동패턴 등을 더 폭 넓게 이해할 수 있습니다.",
                ButtonLabel: "무료로 테스트하기",
                InfoLabel: "40문항",
            },
            {
                Id: "",
                Title: "부부 관계성 테스트 모음",
                Subtitle: "우리관계가 얼마나 좋은지 알아볼까요?",
                Description: "서로의 관계에 대해 더 알 수 있습니다. 테스트 모음",
                ButtonLabel: "무료로 테스트하기",
                InfoLabel: `${surveys[0].Cards.length}종`,
            },
        ]
    }
    
    const video: CardCategoryType = {
        Title: "추천 영상",
        Cards: [
            {
                Id: "",
                Title: "테스트용 영상",
                Subtitle: "테스트용 영상입니다",
                Description: "테스트용 영상 설명",
                ButtonLabel: "보러가기",
                InfoLabel: "",
            }
        ]
    }

    const fullColumn = await ServerService.GetColumnList();
    const column: CardCategoryType = {
        Title: fullColumn.Title,
        Cards: [
            fullColumn.Cards[0],
        ]
    }

    dispatch(_SetOverview(survey, video, column));
}

export const RetrieveTipThunk = () => async (dispatch: Function, getState: Function) => {
    const column = await ServerService.GetColumnList();
    const video: CardCategoryType = {
        Title: "추천 영상",
        Cards: [
            {
                Id: "",
                Title: "테스트용 영상",
                Subtitle: "테스트용 영상입니다",
                Description: "테스트용 영상 설명",
                ButtonLabel: "보러가기",
                InfoLabel: "",
            }
        ]
    }
    dispatch(_SetTip(column, video));
}