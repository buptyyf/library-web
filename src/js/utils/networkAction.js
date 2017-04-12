import config from "../config.js"

export class NetworkAction{
    /**
     * 
     * @param {
     *      url: string (not null)
     *      method: 'GET' | 'POST' (default 'GET')
     *      contentType: 'urlencoded' | 'formdata' | 'json' (default 'urlencode')
     * } baseData
     * 
     * @param {} paramData 
     * 
     * @return { Promise }
     */
    async promiseNetwork(baseData , paramData = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let baseUrl = config.baseUrl;
                const method = (baseData.method || 'GET').toUpperCase();
                const useBody = method === 'POST' || method === 'PUT';
                let url = `${baseUrl}` +
                    (baseUrl.endsWith('/') ? '' : '/') +
                    `${baseData.url}`;
                let contentType = 'application/x-www-form-urlencoded';
                let input = this.urlencodedParam(paramData);
                let headers = {
                    'Content-Type': contentType,
                };
                if(baseData.contentType) {
                    switch (baseData.contentType) {
                        case 'urlencoded':
                            contentType = 'application/x-www-form-urlencoded';
                            input = this.urlencodedParam(paramData);
                            headers = {
                                'Content-Type': contentType,
                            }
                            break;

                        case 'formdata':
                            input = this.formdataParam(paramData);
                            headers = {};
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
                console.log(url);
                let res = await fetch(url, {
                    method: baseData.method,
                    headers: headers,
                    body: useBody ? input : null,
                })
                // console.log("input: ", input, res, res.json());
                if(res.status < 200 || res.status > 299) {
                    throw new Error(res.status + '');
                }
                if(res) {
                    let data = await res.json();
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
        console.log("query:", Object.keys(query), "scope:", scope)
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
            console.log("out:",out)
        })
        return scope ? out : out.substr(1)
    }

    appendQuery(link, query) {
        return query ? (link + '&' + query).replace(/[&?]+/, '?') : link
    }

}

let networkAction = new NetworkAction();
export default networkAction;