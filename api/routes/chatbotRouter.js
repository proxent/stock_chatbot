const bodyParser = require('body-parser');
const { jsdom } = require('jsdom');
const getstockPrice = require('../controllers/chatbotController');

app.post('/', async function(req, res){
    if(req.body.token !== "e03f44cecd329f5037fa48a05495ffa7"){
        return res.send('Authentication failed.');
    }
    try{
        const msgBody = chatbotController(req);
        res.json(msgBody);
    }
    catch(e){
        console.error(e);
    }
});


module.exports = app;