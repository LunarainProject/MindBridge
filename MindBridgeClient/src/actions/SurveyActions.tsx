import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import { LoginState, SurveyResultCardType, SurveyResultType } from "../StateTypes";
import ServerService from "../services/ServerService";
import GoogleService from "../services/GoogleService";

export type SurveyActions = SetResultAction | SetSpouseResultAction;

export class SetResultAction implements IAction {
    type: string = "";
    resultCards: SurveyResultCardType[] = [{
        Title: "",
        Date: new Date(0),
        Id: "",
        Image: "",
        Count: "",
    }];
}
const _SetResults = (resultCards: SurveyResultCardType[]): SetResultAction => {
    return {
        type: ActionTypes.SET_RESULT,
        resultCards: resultCards,
    };
}

export const RetrieveResultsThunk = () => async (dispatch: Function, getState: Function) => {

    const idToken = await GoogleService.getIdToken();
    const result = await ServerService.GetSurveyResultList(idToken);

    //읽은 데이터로 디스패치
    dispatch(_SetResults(result));
}

export class SetSpouseResultAction implements IAction {
    type: string = "";
    resultCards: SurveyResultCardType[] = [{
        Title: "",
        Date: new Date(0),
        Id: "",
        Image: "",
        Count: "",
    }];
}
const _SetSpouseResults = (resultCards: SurveyResultCardType[]): SetResultAction => {
    return {
        type: ActionTypes.SET_SPOUSE_RESULT,
        resultCards: resultCards,
    };
}

export const RetrieveSpouseResultsThunk = () => async (dispatch: Function, getState: Function) => {

    const idToken = await GoogleService.getIdToken();
    const result = await ServerService.GetSpouseResultList(idToken);

    //읽은 데이터로 디스패치
    dispatch(_SetSpouseResults(result));
}