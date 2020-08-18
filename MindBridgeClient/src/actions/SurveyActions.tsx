import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import { LoginState, SurveyResultCardType, SurveyResultType } from "../StateTypes";
import ServerService from "../services/ServerService";

export type SurveyActions = SetResultAction;

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

    //서버에서 읽어옴
    const { idToken } = (getState().Login as LoginState);
    const result = await ServerService.GetSurveyResultList(idToken);

    //읽은 데이터로 디스패치
    dispatch(_SetResults(result));
}