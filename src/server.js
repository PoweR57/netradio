var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.use('/', require('./routes/route'));

app.set("view engine", "twig");
app.set("views", "./src/views");

app.listen(3000, function () {
    console.log('Express app listening on port 3000');
});
