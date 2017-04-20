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
                if(NetworkAction.sessionId) {
                    paramData["sessionId"] = NetworkAction.sessionId;
                }
                let input = this.urlencodedParam(paramData);
                let cookie = "";
                if(NetworkAction.sessionId) {
                    cookie = encodeURIComponent("sessionId") + "=" + encodeURIComponent(NetworkAction.sessionId);
                    console.log("cookie: ", cookie);
                }
                let headers = {
                    'Content-Type': contentType,
                    // 'Access-Control-Allow-Origin': 'http://localhost:8080',
                    // "Access-Control-Allow-Credentials": "true"
                    "Cookie": cookie
                };
                if(baseData.contentType) {
                    switch (baseData.contentType) {
                        case 'urlencoded':
                            contentType = 'application/x-www-form-urlencoded';
                            input = this.urlencodedParam(paramData);
                            headers = {
                                'Content-Type': contentType,
                                // 'Access-Control-Allow-Origin': '*'
                            }
                            break;

                        case 'formdata':
                            input = this.formdataParam(paramData);
                            headers = {
                                // 'Access-Control-Allow-Origin': '*'
                            };
                            break;

                        case 'json':
                            contentType = 'application/json';
                            headers = {
                                'Content-Type': contentType,
                            }
                            input = this.jsonParam(paramData);
                            break;

                        default:
                            break;
                    }
                }
                
                useBody || (url = this.appendQuery(url, input));
                // let contentType = baseData.contentType || 'application/x-www-form-urlencoded';
                console.log(url, input);
                let res = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: useBody ? input : null,
                    // credentials: 'include',
                    // mode: 'no-cors'
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
                    console.log(typeof(cookie), Object.keys(cookie))
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
            if (typeof value === 'object') {
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