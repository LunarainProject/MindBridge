import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import { SurveyResultCardType, SurveyResultType } from "../StateTypes";

export type SurveyActions = AddResultAction;

export class AddResultAction implements IAction {
    type: string = "";
    resultCards: SurveyResultCardType[] = [{
        Title: "",
        Date: new Date(0),
        Id: "",
    }];
}

const _AddResults = (resultCards: SurveyResultCardType[]): AddResultAction => {
    return {
        type: ActionTypes.ADD_RESULT,
        resultCards: resultCards,
    };
}

export const SaveResultThunk = (title: string, id: string) => (dispatch: Function) => { 

    //User의 DB에 결과를 저장

    //클라이언트에 결과 데이터를 저장

    dispatch(_AddResults([{
        Title: title,
        Date: new Date(),
        Id: id,
    }]));
}

export const LoadResultsThunk = () => (dispatch: Function) => {
    //클라이언트 데이터를 읽어옴

    //클라이언트 데이터가 이상하면 서버에서 읽어옴

    //읽은 데이터로 디스패치
    dispatch(_AddResults([{
        Title: "결과 1",
        Date: new Date(),
        Id: "결과1 아이디",
    },
    {
        Title: "결과 2",
        Date: new Date(),
        Id: "결과2 아이디",
    },
    {
        Title: "결과 3",
        Date: new Date(),
        Id: "결과3 아이다",
    }]));
}