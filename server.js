const express = require('express'),
    routes = require('./api/routes/chatbotRouter'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.listen(port);
console.log(`stock price RESTful API server started on: ${port}`);
