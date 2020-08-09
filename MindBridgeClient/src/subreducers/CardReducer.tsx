import ActionTypes from "../actions/ActionTypes";
import { CardActions } from "../actions/CardActions";
import { CardState } from "../StateTypes";

export default (
  state: CardState = {
    OverviewSurveyCategory: {
      Title: "테스트",
      Cards: [
        {
          Title: "제목",
          Subtitle: "부제목",
          Description: "설명",
          ButtonLabel: "버튼 텍스트",
          InfoLabel: "정보",
        },
      ],
    },
    OverviewVideoCategory: {
      Title: "추천 영상",
      Cards: [
        {
          Title: "제목",
          Subtitle: "부제목",
          Description: "설명",
          ButtonLabel: "버튼 텍스트",
          InfoLabel: "정보",
        },
      ],
    },
    OverviewColumnCategory: {
      Title: "추천 칼럼",
      Cards: [
        {
          Title: "제목",
          Subtitle: "부제목",
          Description: "설명",
          ButtonLabel: "버튼 텍스트",
          InfoLabel: "정보",
        },
      ],
    },
    SurveyCategories: [
      {
        Title: "테스트1",
        Cards: [
          {
            Title: "제목",
            Subtitle: "부제목",
            Description: "설명",
            ButtonLabel: "버튼 텍스트",
            InfoLabel: "정보",
          },
        ],
      },
      {
        Title: "테스트2",
        Cards: [
          {
            Title: "제목",
            Subtitle: "부제목",
            Description: "설명",
            ButtonLabel: "버튼 텍스트",
            InfoLabel: "정보",
          },
        ],
      },
    ],
    TipVideoCategory: {
      Title: "실전 팁 영상",
      Cards: [
        {
          Title: "제목",
          Subtitle: "부제목",
          Description: "설명",
          ButtonLabel: "버튼 텍스트",
          InfoLabel: "정보",
        },
      ],
    },

    TipCategory: {
      Title: "실전 팁 칼럼",
      Cards: [
        {
          Title: "제목",
          Subtitle: "부제목",
          Description: "설명",
          ButtonLabel: "버튼 텍스트",
          InfoLabel: "정보",
        },
      ],
    },
  },
  action: CardActions
) => {
  switch (action.type) {
    case ActionTypes.SET_FAKE_DATA:
      state = {
        OverviewSurveyCategory: {
          Title: "테스트",
          Cards: [
            {
              Title: "부부행동 유형 테스트",
              Subtitle: "행동이 관계에 얼마나 영향이 있을까요?",
              Description: "서로의 특성을 이해하는 부부생활",
              ButtonLabel: "무료 테스트하기",
              InfoLabel: "40문항",
            },
            {
              Title: "부부 관계성 테스트 모음",
              Subtitle: "우리 관계가 얼마나 좋은지 알아볼까요?",
              Description: "서로의 특성을 이해하는 부부생활",
              ButtonLabel: "무료 테스트하기",
              InfoLabel: "8종",
            },
          ],
        },
        OverviewVideoCategory: {
          Title: "추천 영상",
          Cards: [
            {
              Title: "온기 있는 집",
              Subtitle: "가족을 긴장시키는 아빠, 해결책은?",
              Description: "김성묵, 한은경 부부 이야기",
              ButtonLabel: "보러가기",
              InfoLabel: "",
            },
          ],
        },
        OverviewColumnCategory: {
          Title: "추천 칼럼",
          Cards: [
            {
              Title: "바람을 피는 이유",
              Subtitle: '"바람기는 타고나는 것" 진실일까, 거짓일까?',
              Description: "바람기에 대한 연구",
              ButtonLabel: "보러가기",
              InfoLabel: "",
            },
          ],
        },
        SurveyCategories: [
          {
            Title: "부부행동 유형 테스트",
            Cards: [
              {
                Title: "부부행동 유형 테스트",
                Subtitle: "행동이 관계에 얼마나 영향이 있을까요?",
                Description: "서로의 특성을 이해하는 부부생활",
                ButtonLabel: "무료 테스트하기",
                InfoLabel: "40문항",
              },
            ],
          },
          {
            Title: "부부 관계성 테스트",
            Cards: [
              {
                Title: "부부 존경지수 테스트",
                Subtitle: "나의 결혼생활은 얼마나 행복할까?",
                Description: "",
                ButtonLabel: "무료 테스트하기",
                InfoLabel: "8+6문항",
              },
              {
                Title: "부부 존경지수 테스트2",
                Subtitle: "나의 결혼생활은 얼마나 행복할까?",
                Description: "",
                ButtonLabel: "무료 테스트하기",
                InfoLabel: "8+6문항",
              },
              {
                Title: "부부 존경지수 테스트3",
                Subtitle: "나의 결혼생활은 얼마나 행복할까?",
                Description: "",
                ButtonLabel: "무료 테스트하기",
                InfoLabel: "8+6문항",
              },
              {
                Title: "부부 존경지수 테스트4",
                Subtitle: "나의 결혼생활은 얼마나 행복할까?",
                Description: "",
                ButtonLabel: "무료 테스트하기",
                InfoLabel: "8+6문항",
              },
              {
                Title: "부부 존경지수 테스트5",
                Subtitle: "나의 결혼생활은 얼마나 행복할까?",
                Description: "",
                ButtonLabel: "무료 테스트하기",
                InfoLabel: "8+6문항",
              },
            ],
          },
        ],
        TipVideoCategory: {
          Title: "실전 팁 영상",
          Cards: [
            {
              Title: "온기 있는 집",
              Subtitle: "가족을 긴장시키는 아빠, 해결책은?",
              Description: "김성묵, 한은경 부부 이야기",
              ButtonLabel: "보러가기",
              InfoLabel: "",
            },
            {
              Title: "온기 있는 집2",
              Subtitle: "가족을 긴장시키는 아빠, 해결책은?",
              Description: "김성묵, 한은경 부부 이야기",
              ButtonLabel: "보러가기",
              InfoLabel: "",
            },
          ],
        },

        TipCategory: {
          Title: "실전 팁 칼럼",
          Cards: [
            {
              Title: "바람을 피는 이유",
              Subtitle: '"바람기는 타고나는 것" 진실일까, 거짓일까?',
              Description: "바람기에 대한 연구",
              ButtonLabel: "보러가기",
              InfoLabel: "",
            },
            {
              Title: "바람을 피는 이유",
              Subtitle: '"바람기는 타고나는 것" 진실일까, 거짓일까?',
              Description: "바람기에 대한 연구",
              ButtonLabel: "보러가기",
              InfoLabel: "",
            },
          ],
        },
      };
      return state;
    default:
      return state;
  }
};

