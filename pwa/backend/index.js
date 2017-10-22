var express = require('express');
var Pluviometro = require('./repository/Pluviometro');
var app = express();

app.get('/pluviometro/list', function(req, res) {
    Pluviometro.list().then(result => {
        res.json(result);
    });
});

app.listen(3000);
console.log("listen 3000");