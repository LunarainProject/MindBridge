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