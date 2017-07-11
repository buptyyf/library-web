import config from "../config.js"

export class NetworkAction{
    /**
     * 
     * @param {
     *      url: string (not null)
     *      method: 'GET' | 'POST' (default 'POST')
     *      contentType: 'urlencoded' | 'formdata' | 'json' (default 'urlencode')
     * } baseData
     * 
     * @param {} paramData 
     * 
     * @return { Promise }
     */
    static sessionId;
    async promiseNetwork(baseData , paramData = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let baseUrl = config.baseUrl;
                const method = (baseData.method || 'POST').toUpperCase();
                const useBody = method === 'POST' || method === 'PUT';
                let url = `${baseUrl}` +
                    (baseUrl.endsWith('/') ? '' : '/') +
                    `${baseData.url}`;
                let contentType = 'application/x-www-form-urlencoded';
                // if(NetworkAction.sessionId) {
                //     paramData["sessionId"] = NetworkAction.sessionId;
                // }
                let input = this.urlencodedParam(paramData);
                let cookie = "";
                if(NetworkAction.sessionId) {
                    cookie = encodeURIComponent("sessionId") + "=" + encodeURIComponent(NetworkAction.sessionId) + ";" + encodeURIComponent("UserInfo") + "=";
                    console.log("cookie: ", cookie);
                }
                let headers = {
                    //'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials": "true",
                    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                    'Access-Control-Allow-Headers': 'access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, access-control-allow-methods, Access-Control-Request-Headers, access-control-allow-credentials',
                    // "Cookie": cookie
                };
                if(baseData.contentType) {
                    switch (baseData.contentType) {
                        case 'urlencoded':
                            input = this.urlencodedParam(paramData);
                            headers = Object.assign({}, headers, {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            });
                            break;

                        case 'formdata':
                            input = this.formdataParam(paramData);
                            headers = Object.assign({}, headers, {});
                            break;

                        case 'json':
                            headers = Object.assign(headers, {
                                'Content-Type': 'application/json',
                            });
                            input = this.jsonParam(paramData);
                            break;

                        default:
                            break;
                    }  
                }else {
                    input = this.urlencodedParam(paramData);
                    headers = Object.assign({}, headers, {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    });
                }
                
                useBody || (url = this.appendQuery(url, input));
                // let contentType = baseData.contentType || 'application/x-www-form-urlencoded';
                console.log(url, input);
                let res = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: useBody ? input : null,
                    credentials: 'include',
                    mode: 'cors'
                })
                // console.log("input: ", input, res, res.json());
                if(res.status < 200 || res.status > 299) {
                    throw new Error(res.status + '');
                }
                if(res) {
                    let cookie = await res.headers;
                    // cookie.forEach((name) => {
                    //     console.log(name, ": ", cookie[name]);
                    // })
                    console.log("server cookie: ", cookie, Object.keys(cookie))
                    if(cookie && cookie.userId && Object.keys(cookie).length != 0) {
                        global.userId = cookie.userId;
                    } else {
                        cookie = document.cookie;
                        global.userId = cookie.userId;
                        console.log('document.cookie: ', cookie);
                    }
                    let data = await res.json();
                    if(data.data && data.data.sessionId) {
                        console.log("cookie: ", data.data.sessionId);
                        NetworkAction.sessionId = data.data.sessionId
                    }
                    resolve(data);
                } else {
                    resolve(null);
                }
                //console.log(data);
            } catch(error) {
                console.log(error);
                reject(error);
            }
        })
    }
    jsonParam(query) {
        return JSON.stringify(query);
    }
    formdataParam(query) {
        let data = new FormData();
        Object.keys(query).forEach((name) => {
            data.append(name, query[name]);
        })
        return data;
    }
    urlencodedParam(query, scope = '') {
        let key
        let value
        let out = ''
        // console.log("query:", Object.keys(query), "scope:", scope)
        Object.keys(query).forEach((name) => {
            key = scope ? `${scope}[${name}]` : name
            value = query[name]
            console.log("name:", name, "key:", key, "value:", value)
            if (value === undefined) return
            value === null && (value = '')
            if (typeof value === 'object' && !Array.isArray(value)) {
                out += this.urlencodedParam(value, key)
            } else {
                out += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            }
            // console.log("out:",out)
        })
        return scope ? out : out.substr(1)
    }

    appendQuery(link, query) {
        return query ? (link + '&' + query).replace(/[&?]+/, '?') : link
    }

}

let networkAction = new NetworkAction();
export default networkAction;