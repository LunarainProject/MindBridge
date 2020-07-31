export type CardType = {
    Title: string;
    Subtitle: string;
    Description: string;
    ButtonLabel: string;
    InfoLabel: string;
}

export type CardCategoryType = {
    Title: string;
    Cards: Card[];
}

export type CardState = {
    OverviewSurveyCategory: CardCategoryType,
    OverviewVideoCategory: CardCategoryType,
    OverviewColumnCategory: CardCategoryType,
    SurveyCategories: CardCategoryType[],
    TipVideoCategory: CardCategoryType,
    TipCategory: CardCategoryType,
}

export type CountState = {
    Count: number;
}

export type LoginState = {
    LoggedOut: boolean;
    LoggedIn: boolean;
    LoginFailed: boolean;   
}