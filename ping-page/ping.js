const axios = require('axios');

const instance = axios.create({
    //baseURL: grafanaUrl,
    timeout: 10000,
    headers: {
        //      'Authorization': `Bearer ww`,
        'Content-Type': 'application/json; charset=utf-8'
    }
});
class HttpRequests {
    async expect200ok(url) {
        var response = await this.get(url);
        if (typeof response !== 'undefined') {
            this.createDiv(response.status);
        } else {
            this.createDiv("error");
        }
        //return response.status;
    }
    get(url) {
        return instance.get(url)
            .then(resp => resp)
            .catch(error => {
                // this.printError(error);
                return error.response
            });
    }
    printError(error) {
        if (error.response)
            console.log(error.response.data.message);
        else
            console.log(error);
    }
    createDiv(statusCode) {
        var r2 = new RegExp("([45]0[0-9])");
        if (typeof document !== 'undefined') {
            if (r2.test(statusCode) || statusCode === "error") {
                var div = document.createElement("div");
                div.style =
                    div.className = "alert alert-danger full";
                div.innerHTML = statusCode;
                document.body.appendChild(div);
            } else {
                var div = document.createElement("div");
                div.className = "alert alert-success full";
                div.innerHTML = statusCode;
                document.body.appendChild(div);
            }
        } else {
            this.printError(statusCode)
        }
    }
}
const http = new HttpRequests();

function parseUrlParam() {

    const localUrl = "https:localhost:3000?url=https://api.us.context.cloud.sap/identity/api-console/index.html?raml=raml%2Fapi%2Fservice.raml";
    //const localUrl = "https://api.us.context.cloud.sap/identity/api-console/index1.html?raml=raml%2Fapi%2Fservice.raml";
    //const localUrl = "https://api.us.context.cloud.sap/identity/dd";
    var url = localUrl;
    console.log(`url1: ${url}`)

    if (typeof location !== 'undefined') {
        url = location;
        var urlObj = new URL(url);
        url = urlObj.searchParams.get("url");
    } /*else {
        var URL = require('url').URL;
        var urlObj = new URL(url);
        url = urlObj.searchParams.get("url");
    }*/

    console.log(`url: ${url}`)
    http.expect200ok(url);
}

parseUrlParam();
