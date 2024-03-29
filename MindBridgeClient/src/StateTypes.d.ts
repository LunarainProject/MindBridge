import { GoogleUser } from "expo-google-app-auth"

export type CardType = {
    Id: string;
    Title: string;
    Subtitle: string;
    Description: string;
    ButtonLabel: string;
    InfoLabel: string;
    Image: any;
}



export type CardCategoryType = {
    Title: string;
    Cards: CardType[];
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
    Image: any;
    Count: string;
    IsCoupled: boolean;
}

export type SurveyState = {
    SurveyResultCards: SurveyResultCardType[];
    // 배우자의 행동유형 테스트 결과
    SpouseResultCards: SurveyResultCardType[];
}

export type UserInfo = {
    name: string;
    image: string;
    birthDay: Date;
    sex: "male"|"female";
}

export type PrivacyState = {
    UserInfo: UserInfo;
    SpouseInfo: UserInfo;
}

export type SystemState = {
    appState: "active" | "inactive";
}