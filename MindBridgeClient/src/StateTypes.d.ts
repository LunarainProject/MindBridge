import { GoogleUser } from "expo-google-app-auth"

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
    loggedIn: boolean;
    autoLogin: boolean;   
    needRegister: boolean;
    user: GoogleUser | null;
    idToken: string | null;
}

export type QuestionType = {
    type: number;
    answer: number | [number, number];
}

export type PageType = {
    question_list: QuestionType[]
}

export type SurveyResultType = {
    page_list: PageType[]
}

export type SurveyResultCardType = {
    Title: string;
    Date: Date;
    Id: string;
}

export type SurveyState = {
    SurveyResultCards: SurveyResultCardType[];

}