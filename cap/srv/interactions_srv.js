const cds = require('@sap/cds')

//---- SET UP CHIAMATA -----
const http = require('http');
module.exports = cds.service.impl(function () {
    this.before('CREATE', 'Interactions_Header', _setHeader)
    this.after('READ', 'Interactions_Header', _prova)
    //this.before('READ','Interactions_Header',debug)
})
async function _setHeader(req) {
    let host = req.headers.host
    let risp = await httprequest(host).then(res=>res)
    console.log("request")
    console.log(req.data)
    req.data.ID = risp.value[0].ID + 1
//let lettura = await cds.read("Interactions_Header").orderBy("ID","desc")
    let i  = 0
    i++
}
function httprequest(host) {
    return new Promise((resolve, reject) => {
        const req = http.request("http://"+host+"/catalog/Interactions_Header?$orderby=ID%20desc&$top=1",
            (res) => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error("errore" + res.statusCode))
                }
                var body = []
                res.on('data', function (chunk) {
                    body.push(chunk)
                })
                res.on('end', function () {
                    try {
                       var bodyObj = JSON.parse(body)
                       console.log(bodyObj.value)
                    } catch (e) {
                        reject(e)
                    }
                    resolve(bodyObj)
                })
            })
        req.on('error', (e) => {
            reject(e.message)
        })
        req.end()
    })
}
function _prova(req) {
    let i = req.data;
    return i
}
function debug(req){
    let i = 0
    i++
}