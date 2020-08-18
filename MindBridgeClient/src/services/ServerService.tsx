import { GoogleUser } from "expo-google-app-auth";
import defaultIcon from "react-native-paper/lib/typescript/src/components/MaterialCommunityIcon";
import SurveyCard from "../components/SurveyCard";
import { CardCategoryType, CardType, SurveyResultCardType, UserInfo } from "../StateTypes";

export default class ServerService {
    public static async RegisterAccount(idToken: string | null, birth: string, sex: string) {
        if(idToken !== null) {

            let response;
            try {
                const build = 
                    FetchBuilder
                    .build("http://gfs3456.cafe24.com/api/RegisterUserInfo.php")
                    .param('id_token', idToken)
                    .param('birth', birth)
                    .param('sex', sex);
                console.log(build.toString());
                response = await build.fetch();
            } catch(e) {
                console.log('fetch error. error Msg: ', e, response);
            }

            let responseText;
            try {
                responseText = await response?.text();
            } catch(e) {
                console.log('text request error: ', e);
            }

            return responseText;
        }
    }

    public static async CheckUserRegistered(idToken: string | null) {
        if(idToken !== null) {
            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/CheckUser.php")
                                       .param('id_token', idToken)
                                       .fetch();
            } catch(e) {
                console.log('fetch error. error Msg: ', e, response);
            }

            let responseText;
            try {
                responseText = await response?.text();
            } catch(e) {
                console.log('response parse error: ', e);
            }

            console.log(responseText);
            return responseText;
        }
    }

    public static async GetSurveyList(idToken: string | null): Promise<CardCategoryType[]>
    {
        if(idToken !== null) {
            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/testlist.php")
                                             .fetch();
            } catch(e) {
                console.log('fetch error: ', e);
            }

            type SurveyPacket = {
                PkgId: string;
                Title: string;
                SubTitle: string;
                Description: string;
                InfoLabel: string;
            }

            let data: SurveyPacket[] | null = null;
            try {
                data = await response?.json();
            } catch(e) {
                console.log('json parse error:', e);
                data = null;
            }

            if(data === null) return [{
                Title: "부부 관계성 테스트",
                Cards: [],
            }];

            console.log("TEST** : ", data);

            return [{
                Title: "부부 관계성 테스트",
                Cards: data.map(data => { return {
                    Title: data.Title ?? "",
                    Subtitle: data.SubTitle ?? "",
                    Description: data.Description ?? "",
                    ButtonLabel: "무료 테스트하기",
                    InfoLabel: data.InfoLabel ?? "",
                    Id: data.PkgId ?? "",
                    Image: `http://gfs3456.cafe24.com/pkgImg/${data.PkgId}.jpg`,
                }})
            }];
        }
        else
        {
            return [{
                Title: "부부 관계성 테스트",
                Cards: [],
            }];
        }
    }

    public static async GetVideoList(): Promise<CardCategoryType>
    {
            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/videolist.php")
                                             .fetch();
            } catch(e) {
                console.log('fetch error: ', e);
            }

            type ResultPacket = {
                videoSrl: string;
                videoUrl: string;
                title: string;
                subtitle: string;
                description: string;
            }

            let packet = null;

            try {
                packet = await response?.json();
                console.log(packet);
            } catch(e) {
                console.log("json parse error :", e);
            }

            if(packet === null) {
                return {
                    Title: "부부 팁 영상",
                    Cards: []
                };
            }

            return {
                Title: "부부 팁 영상",
                Cards: Object.values(packet).map((result) => {
                    const res = result as ResultPacket;
                    console.log(res);
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
                })
            };
    }
    

    public static async GetUserInfo(idToken: string | null, user: GoogleUser | null): Promise<UserInfo>
    {
        if(idToken !== null)
        {
            type UserInfoPacket = {
                name: "",
                email: "",
                picture_url: "",
                birth: "",
                sex: "male"|"female",
            }

            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/BringUserInfo.php")
                                       .param("id_token", idToken)
                                       .fetch();
            } catch(e) {
                console.log('fetch error: ', e);
            }

            let packet: UserInfoPacket | null = null;
            try {
                packet = await response?.json();
            } catch(e) {
                packet = null;
                console.log('json parse error: ', e);
            }

            console.log('userInfoPacket: ', packet);

            if(packet === null) {
                return {
                    name: user?.name ?? "",
                    image: user?.photoUrl ?? "",
                    birthDay: new Date(),
                    sex: "female"
                }
            }

            // `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
            const [year, month, day] = packet.birth.split('.');
            
            return {
                name: user?.name ?? "",
                image: user?.photoUrl ?? "",
                birthDay: year&&month&&day? new Date(parseInt(year), parseInt(month), parseInt(day), 0, 0, 0, 0) : new Date(),
                sex: packet.sex,
            }
        }
        else 
        {
            return {
                name: "",
                image: "",
                birthDay: new Date(),
                sex: "female"
            }
        }
    }

    public static async GetSpouseInfo(idToken: string | null): Promise<UserInfo | null>
    {
        console.log("Get SPOUSE INFO", idToken);

        if(idToken !== null) {
            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/CheckMatching.php")
                                             .param("id_token", idToken)
                                             .fetch();
            } catch(e) {
                console.log('fetch error: ', e);
            }

            console.log('fetch end');

            let text: string | undefined;
            try {
                text = await response?.text();
                console.log('[text : ', text, ']');
                switch(text) {
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
            } catch(e) {
                console.log("text parse error: ", e);
            }

            if(text == undefined) {
                return null;
            }

            type UserInfoPacket = {
                name: "",
                email: "",
                picture_url: "",
                birth: "",
                sex: "male"|"female",
            }

            let packet: UserInfoPacket | null = null;
            
            try {
                packet = await JSON.parse(text);
            } catch(e) {
                console.log("json parse error: ", e);
                return null;
            }

            console.log(packet);

            if(packet === null) {
                return null;
            } else {
                // // `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
                // const [year, month, day] = packet.birth.split('.');

                const [year, month, day] = ["2020", "10", "3"];
                
                return {
                    name: packet?.name ?? "",
                    image: packet?.picture_url ?? "",
                    birthDay: year&&month&&day? new Date(parseInt(year), parseInt(month), parseInt(day), 0, 0, 0, 0) : new Date(),
                    sex: packet.sex,
                }
            }
        }

        return null;
    }
    
    public static async MatchSpouse(idToken: string | null, spouseEmail: string)
    {
        if(idToken !== null) {
            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/MatchingPartner.php")
                                             .param("id_token", idToken)
                                             .param("partner_email", spouseEmail)
                                             .fetch();
            } catch(e) {
                console.log('fetch error: ', e);
            }

            let text;
            try {
                text = await response?.text();
                switch(text) {
                    case "1 => 커플 등록이 완료되었습니다.":
                        alert("배우자가 나를 등록하면 매칭이 완료됩니다.")
                        return;
                    
                    case "2 => 커플 매칭이 완료되었습니다.":
                        alert("부부 매칭이 완료되었습니다.")
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
                        alert("개발자에게 문의해 주세요. 에러 타입: "+text);
                        return;
                }
            } catch(e) {
                console.log('text parse error: ', e);
            }
        }
        return;
    }

    public static async GetColumnList(): Promise<CardCategoryType> {
        let response;
        try {
            response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/columnlist.php")
                                         .fetch();
        } catch(e) {
            console.log('fetch error: ', e);
        }

        type ColumnPacket = {
            ColumnSrl: string,
            Title: string,
            SubTitle: string,
            Description: string,
        }

        let packet: ColumnPacket[] | null = null;
        try {
            packet = await response?.json();
        } catch(e) {
            console.log('json parse error: ', e);
        }

        const ret: CardCategoryType = {
            Title: "실전 부부 팁",
            Cards: packet?.map((pack) => {
                const card: CardType = {
                    Id: pack.ColumnSrl,
                    Title: pack.Title,
                    Subtitle: pack.SubTitle,
                    Description: pack.Description,
                    Image: `http://gfs3456.cafe24.com/colImg/${pack.ColumnSrl}.jpg`,
                    ButtonLabel: "지금 확인하기",
                    InfoLabel: "",
                }
                return card;
            }) ?? []
        }

        return ret;
    }

    public static async GetSurveyResultList(idToken: string | null): Promise<SurveyResultCardType[]> {

        console.log("GSRL, idtoken: ", idToken);

        if(idToken !== null)
        {
            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/resultlist.php")
                                             .param("id_token", idToken)
                                             .fetch();
            } catch(e) {
                console.log('fetch error: ', e);
            }

            type ResultPacket = {
                pkg_id: string;
                count: string;
                img_url: string;
                title: string;
                date: string;
            }

            let packet = null;

            try {
                packet = await response?.json();
                console.log(packet);
            } catch(e) {
                console.log("json parse error :", e);
            }

            if(packet === null) {
                return [];
            }

            return Object.values(packet).map((result) => {
                const res = result as ResultPacket;
                console.log(res);
                return {
                    Title: res.title,
                    Count: res.count,
                    Image: res.img_url,
                    Date: new Date(),
                    Id: res.pkg_id,
                };
            })
        }

        return [];
    }

    public static async CancelMembershipList(idToken: string | null) {
        if(idToken !== null)
        {
            let response;
            try {
                response = await FetchBuilder.build("http://gfs3456.cafe24.com/api/CancelMemberShip.php")
                                             .param("id_token", idToken)
                                             .fetch();
            } catch(e) {
                console.log('fetch error: ', e);
            }

            console.log(await response?.text());
        }
    }
}

class FetchBuilder {
    private _url: string ="";
    private _param: {param: string, value: string}[] = [];
    private constructor(url: string, param: {param: string, value: string}[]) {
        this._url = url;
        this._param = param;
    }
    public static build(url: string): FetchBuilder {
        return new FetchBuilder(url, []);
    }
    public param(param: string, value: string): FetchBuilder
    {
        return new FetchBuilder(this._url, [...this._param, {param, value}]);
    }
    public toString() {
        return this._url + '?' + this._param.map(({param, value}) => `${param}=${value}`).join('&');
    }
    public async fetch(init: RequestInit | undefined = undefined) {
        return await fetch(this.toString(), init);
    }
}