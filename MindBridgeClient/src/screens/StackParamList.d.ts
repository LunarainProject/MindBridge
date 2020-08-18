type StackParamList = {
    Main: undefined;
    Register: undefined;
    Test: undefined;
    SurveyWeb: {
        SurveyId: string,
    };
    SurveyResult: {
        SurveyResultId: string,
        SurveyResultCount: string,
    };
    TipWeb: {
        ColumnId: string,
    }
    SurveyHistory: undefined;
    Login: undefined;
};

export default StackParamList;