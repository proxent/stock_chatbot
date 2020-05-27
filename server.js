const express = require('express'),
    csv = require('csv'),
    request = require('request-promise-native'),
    bodyParser = require('body-parser'),
    jsdom = require('jsdom'),
    { JSDOM } = jsdom,
    routes = require('./api/routes/sotckserverRoutes'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', async function(req, res){
    if(req.body.token !== "e03f44cecd329f5037fa48a05495ffa7"){
        return res.send('Authentication failed.');
    }
    let now = new Date();
    now.setHours(now.getHours() + 9);
    try{
        const url = encodeURI(`https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${req.body.data}`);
        const searchResult = await request(url);
        const dom = new JSDOM(searchResult, { runScripts: "outside-only" });
        const price = dom.window.document.querySelector("#_cs_root > div.ar_spot > div > h3 > a > span.spt_con.dw > strong").textContent,
            change = dom.window.document.querySelector("#_cs_root > div.ar_spot > div > h3 > a > span.spt_con.dw > span.n_ch > em:nth-child(3)").textContent,
            rate = dom.window.document.querySelector("#_cs_root > div.ar_spot > div > h3 > a > span.spt_con.dw > span.n_ch > em:nth-child(4)").textContent;
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
        res.json(msgBody);
    }
    catch(e){
        console.error(e);
    }
});

app.listen(port);
console.log(`stock price RESTful API server started on: ${port}`);
