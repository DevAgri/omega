var express = require('express');
var moment = require('moment');
var app = express();
var server = require('http').createServer(app);
var Pluviometro = require('./repository/Pluviometro');
var PluviometroMedicao = require('./repository/PluviometroMedicao');


var socket = require("socket.io")(server);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/pluviometro/list', function(req, res) {
    Pluviometro.list().then(result => {
        res.json(result);
    });
});

app.get('/pluviometromedicao/listall', function (req, res)  {
    PluviometroMedicao.listAll().then(result => {
        res.json(result);
    });
});

app.get('/pluviometromedicao/maplist', function (req, res)  {
    PluviometroMedicao.mapList().then(result => {
        res.json(result);
    });
});

app.get('/pluviometromedicao/gravar', function (req, res)  {

    var data = moment().format("YYYY-MM-DD");
    var valor = req.query.valor;
    var nome = req.query.nome;
    var pluvId = req.query.pluvId;

    PluviometroMedicao.insert(valor, data, nome, pluvId).then(result => {
        res.json(result);
    });
});

socket.on("update.pluviometro", function() {
    console.info("atualizar pluviometro");
    socket.emit("updatemap");
});

app.listen(3000);
console.log("listen 3000");