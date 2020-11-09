import { GoogleUser } from "expo-google-app-auth";
import {
  CardCategoryType,
  CardType,
  SurveyResultCardType,
  UserInfo,
} from "../StateTypes";
import NetInfo from "@react-native-community/netinfo";
import JwtDecode from "jwt-decode";
import { Alert, Platform } from "react-native";

export default class ServerService {
  private static accessToken: string | null = null;

  private static async InternetCheck() {
    const status = await NetInfo.fetch();
    if (!status.isConnected) {
      alert("인터넷 연결을 확인해주세요.");
      return false;
    }
    return true;
  }

  private static async RetrieveAccessToken(idToken: string | null) {
    //서버에서 액세스 토큰을 받아옵니다. 근데 그냥 제가 만들 겁니다.
    if(Platform.OS==="android"){
    if (idToken !== null) {
      const decoded = JwtDecode(idToken);
      console.log(decoded);
      type Decode = {
        sub: string;
      };
      const uid = (decoded as Decode)?.sub;
      console.log("userId: ", uid);
      //uid 를 암호화 (따위 안 함)
      ServerService.accessToken = uid ?? null;
    }
    }
    else if(Platform.OS==="ios"){
      ServerService.accessToken = idToken;
    }
  }

  public static _GetAccessToken(): string | null {
    return ServerService.accessToken;
  }

  public static GetSurveyResultUrl(
    resultId: string,
    resultCount: string,
    spouseCount: string
  ) {
    const surveyResultUri: string =
      "http://gfs3456.cafe24.com/manage/TestResult";
    return `${surveyResultUri}/${resultId}/${this.accessToken}/${resultCount}/${spouseCount}`;
  }

  public static GetSurveyStartUrl(surveyId: string) {
    const surveyUri: string = "http://gfs3456.cafe24.com/manage/TestStartPage";
    return `${surveyUri}/${surveyId}/${this.accessToken}`;
  }

  public static async RegisterAccount(
    idToken: string | null,
    birth: string,
    sex: string
  ) {
    if (idToken !== null) {
      if (!(await this.InternetCheck())) {
        return "NoInternet";
      }

      let response;
      try {
        const build = FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/RegisterUserInfo.php"
        )
          .param("id_token", idToken)
          .param("birth", birth)
          .param("sex", sex);
        console.log(build.toString());
        response = await build.fetch();
      } catch (e) {
        console.log("fetch error. error Msg: ", e, response);
        return "Fetch Failed";
      }

      let responseText;
      try {
        responseText = await response?.text();
      } catch (e) {
        console.log("text request error: ", e);
      }

      this.RetrieveAccessToken(idToken);
      return responseText;
    }
  }

  public static async AppleRegisterAccount(
    email: string,
    password: string,
    name: string
  ) {
      if (!(await this.InternetCheck())) {
        return "NoInternet";
      }

      console.log('register', email, password, name);

      let response;
      try {
        const build = FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/apple/join.php"
        )
          .param("name", name)
          .param("email", email)
          .param("password", password);
        console.log(build.toString());
        response = await build.fetch();
      } catch (e) {
        console.log("fetch error. error Msg: ", e, response);
        return "Fetch Failed";
      }

      console.log('register apple');

      let responseJson: { log: string} = {
        log: "fail"
      };
      try {
        responseJson = await response?.json();
      } catch (e) {
        console.log("json request error: ", e);
      }
      return responseJson;
  }

  public static async CheckUserRegistered(idToken: string | null) {
    if (idToken !== null) {
      if (!(await this.InternetCheck())) {
        return "NoInternet";
      }

      console.log('hi');

      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/CheckUser.php"
        )
          .param("id_token", idToken)
          .fetch();
      } catch (e) {
        console.log("fetch error. error Msg: ", e);
        return "Fetch Failed";
      }

      console.log('check user', idToken);

      let responseText;
      try {
        responseText = await response?.text();
      } catch (e) {
        console.log("response parse error: ", e);
      }

      console.log('response : <<', responseText, '>>');

      if (responseText != "Failed") this.RetrieveAccessToken(idToken);
      return responseText;
    }
  }

  public static async AppleCheckUserRegistered(email: string, password: string) {
      if (!(await this.InternetCheck())) {
        return "NoInternet";
      }

      console.log('hi');

      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/apple/login.php"
        )
          .param("email", email)
          .param("password", password)
          .fetch();
      } catch (e) {
        console.log("fetch error. error Msg: ", e);
        return "Fetch Failed";
      }

      console.log('check user', email);

      let responseJson : {
        log: string, id: string, name: string
      } = {
        log : "falied", id: "", name: ""
      };
      try {
        responseJson = await response?.json();
      } catch (e) {
        console.log("response parse error: ", e);
      }

      console.log('response : <<', responseJson, '>>');

      if (responseJson.log == "success") this.RetrieveAccessToken(responseJson.id);
      return responseJson;
  }

  public static async GetSurveyList(): Promise<CardCategoryType[]> {
    if (!(await this.InternetCheck())) {
      return [
        {
          Title: "부부 관계성 테스트",
          Cards: [],
        },
      ];
    }

    let response;
    try {
      response = await FetchBuilder.build(
        "http://gfs3456.cafe24.com/api/testlist.php"
      ).fetch();
    } catch (e) {
      console.log("fetch error: ", e);
      return [
        {
          Title: "부부 관계성 테스트",
          Cards: [],
        },
      ];
    }

    type SurveyPacket = {
      PkgId: string;
      Title: string;
      SubTitle: string;
      Description: string;
      InfoLabel: string;
    };

    let data: SurveyPacket[] | null = null;
    try {
      data = await response?.json();
    } catch (e) {
      console.log("json parse error:", e);
      data = null;
    }

    if (data === null)
      return [
        {
          Title: "부부 관계성 테스트",
          Cards: [],
        },
      ];

    return [
      {
        Title: "부부 관계성 테스트",
        Cards: data.map((data) => {
          return {
            Title: data.Title ?? "",
            Subtitle: data.SubTitle ?? "",
            Description: data.Description ?? "",
            ButtonLabel: "무료 테스트하기",
            InfoLabel: data.InfoLabel ?? "",
            Id: data.PkgId ?? "",
            Image: `http://gfs3456.cafe24.com/pkgImg/${data.PkgId}.jpg`,
          };
        }),
      },
    ];
  }


  public static async GetVideoList(): Promise<CardCategoryType> {
    if (!(await this.InternetCheck())) {
      return {
        Title: "행복부부팁",
        Cards: [],
      };
    }

    let response;
    try {
      response = await FetchBuilder.build(
        "http://gfs3456.cafe24.com/api/videolist.php"
      ).fetch();
    } catch (e) {
      console.log("fetch error: ", e);
      return {
        Title: "행복부부팁",
        Cards: [],
      };
    }

    type ResultPacket = {
      videoSrl: string;
      videoUrl: string;
      title: string;
      subtitle: string;
      description: string;
    };

    let packet = null;

    try {
      packet = await response?.json();
    } catch (e) {
      console.log("json parse error :", e);
    }

    if (packet === null) {
      return {
        Title: "행복부부팁",
        Cards: [],
      };
    }

    return {
      Title: "행복부부팁",
      Cards: Object.values(packet).map((result) => {
        const res = result as ResultPacket;
        const ret: CardType = {
          Title: res.title,
          Id: res.videoSrl,
          Image: `http://gfs3456.cafe24.com/videoImg/${res.videoSrl}.jpg`,
          Description: res.description,
          Subtitle: res.subtitle,
          ButtonLabel: "보러가기",
          InfoLabel: res.videoUrl,
        };
        return ret;
      }),
    };
  }

  public static async GetUserInfo(user: GoogleUser | null): Promise<UserInfo> {
    if (ServerService.accessToken !== null) {
      if (!(await this.InternetCheck())) {
        return {
          name: user?.name ?? "",
          image: user?.photoUrl ?? "",
          birthDay: new Date(),
          sex: "female",
        };
      }

      type UserInfoPacket = {
        name: "";
        email: "";
        picture_url: "";
        birth: "";
        sex: "male" | "female";
      };

      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/BringUserInfo.php"
        )
          .param("access_token", ServerService.accessToken)
          .fetch();
      } catch (e) {
        console.log("fetch error: ", e);
        return {
          name: user?.name ?? "",
          image: user?.photoUrl ?? "",
          birthDay: new Date(),
          sex: "female",
        };
      }

      let packet: UserInfoPacket | null = null;
      try {
        packet = await response?.json();
      } catch (e) {
        packet = null;
        console.log("json parse error: ", e);
      }

      console.log("userInfoPacket: ", packet);

      if (packet === null) {
        return {
          name: user?.name ?? "",
          image: user?.photoUrl ?? "",
          birthDay: new Date(),
          sex: "female",
        };
      }

      if(Platform.OS === "ios")
        if(user != null) user.photoUrl = "";

      return {
        name: user?.name ?? "",
        image: user?.photoUrl ?? "",
        birthDay: new Date(),
        sex: packet.sex,
      };
    } else {
      return {
        name: "",
        image: "",
        birthDay: new Date(),
        sex: "female",
      };
    }
  }

  public static async GetSpouseInfo(): Promise<UserInfo | null> {
    console.log("GET SPOUSE INFO, access token: ", this.accessToken);

    if (this.accessToken !== null) {
      if (!(await this.InternetCheck())) {
        return null;
      }

      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/CheckMatching.php"
        )
          .param("access_token", this.accessToken)
          .fetch();
      } catch (e) {
        console.log("fetch error: ", e);
        return null;
      }

      console.log("fetch end");

      let text: string | undefined;
      try {
        text = await response?.text();
        console.log("[text : ", text, "]");
        switch (text) {
          case "등록되지 않은 유저입니다.":
            console.log("등록되지 않은 유저입니다.");
            return null;
          case "파트너 등록 혹은 매칭이 되지 않았습니다.":
            console.log("파트너 등록을 하지 않았습니다.");
            return null;
          case "파트너 등록은 되었으나 매칭은 되지 않았습니다.":
            console.log("매칭된 파트너가 없습니다.");
            return null;
        }
      } catch (e) {
        console.log("text parse error: ", e);
      }

      if (text == undefined) {
        return null;
      }

      type UserInfoPacket = {
        name: "";
        email: "";
        picture_url: "";
        birth: "";
        sex: "male" | "female";
      };

      let packet: UserInfoPacket | null = null;

      try {
        packet = await JSON.parse(text);
      } catch (e) {
        console.log("json parse error: ", e);
        return null;
      }

      if (packet === null) {
        return null;
      } else {

        if(Platform.OS === "ios")
          packet.picture_url = "";

        return {
          name: packet?.name ?? "",
          image: packet?.picture_url ?? "",
          birthDay: new Date(),
          sex: packet.sex,
        };
      }
    }

    return null;
  }

  public static async MatchSpouse(spouseEmail: string) {
    console.log("Match Spouse, access token: ", this.accessToken);

    if (this.accessToken !== null) {
      if (!(await this.InternetCheck())) {
        return;
      }

      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/MatchingPartner.php"
        )
          .param("access_token", this.accessToken)
          .param("partner_email", spouseEmail)
          .fetch();
      } catch (e) {
        console.log("fetch error: ", e);
        return;
      }

      let text;
      try {
        text = await response?.text();
        console.log(`[text: ${text}]`);
        switch (text) {
          case "1 => 커플 등록이 완료되었습니다.":
            alert("배우자가 나를 등록하면 매칭이 완료됩니다.");
            return;

          case "2 => 커플 매칭이 완료되었습니다.":
            alert("부부 매칭이 완료되었습니다.");
            return;

          case "3 => 이미 매칭이 되었습니다.":
            alert("이미 처리되었습니다.");
            return;

          case "4 => 커플 덮어쓰기가 완료되었습니다.":
            alert("배우자 정보가 변경되었습니다.");
            return;

          case "5 => 다른 사람과 매칭되었습니다. 관리자에게 문의하세요.":
            alert("배우자가 다른 사람과 매칭되어 있습니다.");
            return;

          case "유효하지 않은 아이디 토큰입니다.":
            alert("로그아웃되었습니다. 완전히 종료 후 다시 실행해 주세요.");
            return;

          case "배우자의 이메일이 등록되어 있지 않습니다.":
            alert("배우자가 등록되어 있지 않습니다.");
            return;

          case "파트너와 성별이 동일합니다.":
            alert("배우자와 성별이 동일합니다.");
            return;

          default:
            alert("개발자에게 문의해 주세요. 에러 타입: " + text);
            return;
        }
      } catch (e) {
        console.log("text parse error: ", e);
      }
    }
    return;
  }

  public static async GetColumnList(): Promise<CardCategoryType> {
    if (!(await this.InternetCheck())) {
      return {
        Title: "부부 팁 칼럼",
        Cards: [],
      };
    }

    let response;
    try {
      response = await FetchBuilder.build(
        "http://gfs3456.cafe24.com/api/columnlist.php"
      ).fetch();
    } catch (e) {
      console.log("fetch error: ", e);
      return {
        Title: "부부 팁 칼럼",
        Cards: [],
      };
    }

    type ColumnPacket = {
      ColumnSrl: string;
      Title: string;
      SubTitle: string;
      Description: string;
    };

    let packet: ColumnPacket[] | null = null;
    try {
      packet = await response?.json();
    } catch (e) {
      console.log("json parse error: ", e);
    }

    const ret: CardCategoryType = {
      Title: "부부 팁 칼럼",
      Cards:
        packet?.map((pack) => {
          const card: CardType = {
            Id: pack.ColumnSrl,
            Title: pack.Title,
            Subtitle: pack.SubTitle,
            Description: pack.Description,
            Image: `http://gfs3456.cafe24.com/colImg/${pack.ColumnSrl}.jpg`,
            ButtonLabel: "지금 확인하기",
            InfoLabel: "",
          };
          return card;
        }) ?? [],
    };

    return ret;
  }

  public static async GetSurveyResultList(): Promise<SurveyResultCardType[]> {
    console.log("GSRL, accessToken: ", ServerService.accessToken);

    if (!(await this.InternetCheck())) {
      return [];
    }

    if (this.accessToken !== null) {
      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/resultlist.php"
        )
          .param("access_token", this.accessToken)
          .fetch();
      } catch (e) {
        console.log("fetch error: ", e);
        return [];
      }

      type ResultPacket = {
        pkg_id: string;
        count: string;
        img_url: string;
        title: string;
        date: string;
      };

      let packet = null;

      try {
        packet = await response?.json();
        console.log(packet);
      } catch (e) {
        console.log("json parse error :", e);
      }

      if (packet === null) {
        return [];
      }

      return await Promise.all(Object.values(packet).map(async (result) => {
        const res = result as ResultPacket;
        console.log("SurveyResult: ", res);

        let coupledRes;
        try {
          coupledRes = await FetchBuilder.build(
            "http://gfs3456.cafe24.com/api/CheckCouple.php"
          )
            .param("pkg_id", res.pkg_id)
            .fetch();
        } catch (e) {
          console.log("fetch error: ", e);
        }

        let coupledJson;
        try {
          coupledJson = await coupledRes?.json() ?? {};
        } catch (e) {
          console.log('json parse error: ', e);
        }

        type Couple = {
          couple: string;
        }

        let isCoupled: boolean = false;
        if ((coupledJson as Couple).couple == "false") isCoupled = false;
        if ((coupledJson as Couple).couple == "null") isCoupled = false;
        if ((coupledJson as Couple).couple == "true") isCoupled = true;

        const [year, month, date] = res.date.split(".");
        console.log(year, month, date);
        return {
          Title: res.title,
          Count: res.count,
          Image: res.img_url,
          Date: new Date(parseInt(year), parseInt(month) - 1, parseInt(date)),
          Id: res.pkg_id,
          IsCoupled: isCoupled,
        };
      }));
    }

    return [];
  }

  public static async GetSpouseResultList(pkgId: string): Promise<SurveyResultCardType[]> {
    console.log("GSPOUSERL, accessToken: ", this.accessToken);

    if (!(await this.InternetCheck())) {
      return [];
    }

    if (this.accessToken !== null) {
      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/PartnerResultList2.php"
        )
          .param("access_token", this.accessToken)
          .param("pkg_id", pkgId)
          .fetch();
      } catch (e) {
        console.log("fetch error: ", e);
        return [];
      }

      type ResultPacket = {
        pkg_id: string;
        count: string;
        img_url: string;
        title: string;
        date: string;
      };

      let packet = null;

      try {
        packet = await response?.json();
        console.log(packet);
      } catch (e) {
        console.log("json parse error :", e);
      }

      if (packet === null) {
        return [];
      }

      return Object.values(packet).map((result) => {
        const res = result as ResultPacket;
        const [year, month, date] = res.date.split(".");
        console.log(res);
        return {
          Title: res.title,
          Count: res.count,
          Image: res.img_url,
          Date: new Date(parseInt(year), parseInt(month) - 1, parseInt(date)),
          Id: res.pkg_id,
          IsCoupled: true,
        };
      });
    }

    return [];
  }

  public static async CancelMembership() {
    if (this.accessToken !== null) {
      if (!(await this.InternetCheck())) {
        return;
      }

      let response;
      try {
        response = await FetchBuilder.build(
          "http://gfs3456.cafe24.com/api/CancelMemberShip.php"
        )
          .param("access_token", this.accessToken)
          .fetch();
      } catch (e) {
        console.log("fetch error: ", e);
        return;
      }

      console.log(await response?.text());
    }
  }

  public static async AppleEmailValidation(email: string) {
    let response;
    try {
      response = await FetchBuilder.build(
        "http://gfs3456.cafe24.com/api/email/send.php"
      ).param("email", email).fetch();
    } catch(e) {
      console.log("fetch error", e);
      return "failed";
    }

    let respJson;
    try{
      respJson = await response.json();
    } catch(e)
    {
      console.log("json parse error", e);
      return "failed";
    }

    type Packet = {
      log: string;
      count: string;
      msg: string;
    }

    if((respJson as Packet).log === "success")
      return "success";
    else
    {
      if(respJson.msg === "email already certified")
      {
        Alert.alert("이메일이 이미 인증되었습니다.");
        return "email already certified";
      }
      else
      {
        return "failed";
      }
    }
  }
}

class FetchBuilder {
  private _url: string = "";
  private _param: { param: string; value: string }[] = [];
  private constructor(url: string, param: { param: string; value: string }[]) {
    this._url = url;
    this._param = param;
  }
  public static build(url: string): FetchBuilder {
    return new FetchBuilder(url, []);
  }
  public param(param: string, value: string): FetchBuilder {
    return new FetchBuilder(this._url, [...this._param, { param, value }]);
  }
  public toString() {
    return (
      this._url +
      "?" +
      this._param.map(({ param, value }) => `${param}=${value}`).join("&")
    );
  }
  public async fetch(init: RequestInit | undefined = undefined) {
    return await fetch(this.toString(), init);
  }
}
