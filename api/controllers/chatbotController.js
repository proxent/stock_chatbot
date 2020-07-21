const request = require('request-promise-native');
const { JSDOM } = require('jsdom');

function parseSearchResult(dom){
    const $ = dom.window.document.querySelector;
    const stock = {
        price: $("#_cs_root > div.ar_spot > div > h3 > a > span.spt_con.dw > strong").textContent,
        change: $("#_cs_root > div.ar_spot > div > h3 > a > span.spt_con.dw > span.n_ch > em:nth-child(3)").textContent,
        rate: $("#_cs_root > div.ar_spot > div > h3 > a > span.spt_con.dw > span.n_ch > em:nth-child(4)").textContent
    }
    return stock;
}
async function getStockPrice(req){
    const url = encodeURI(`https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${req.body.data}`);
    const searchResult = await request(url);
    const dom = new JSDOM(searchResult, { runScripts: "outside-only" });
    const { price, change, rate } = parseSearchResult(dom);
    const msgBody = {
        "body": `[오늘의 주가 지수] ${now.toLocaleString('ko-KR')}`,
        "connectColor": "#FAC11B",
        "connectInfo": [
            {
                "title": req.body.data,
                "description": `${price} ${change} ${rate}`
            }
        ]
    };
    return msgBody;
}

module.exports = getstockPrice;

