type StackParamList = {
    Main: undefined;
    Register: undefined;
    Test: undefined;
    SurveyWeb: {
        SurveyId: string,
    };
    VideoWeb: {
        Url: string,
    }
    SurveyResult: {
        SurveyResultId: string,
        SurveyResultCount: string,
        SpouseCount?: string,
    };
    SpouseHistory: {
        SurveyResultId: string,
        SurveyResultCount: string,
    };
    TipWeb: {
        ColumnId: string,
    }
    SurveyHistory: undefined;
    Login: undefined;
    
    //subScreens
    Announce: undefined;
    AppInfo: undefined;
    Ask: undefined;
    FAQ: undefined;
    Point: undefined;
    Reference: undefined;
};

export default StackParamList;