var connector = require("../utils/connector.js");

exports.list = function(pluviometroId) {
    return new Promise(function(resolve, reject) {
        let sql = `select p.valor, p.periodo from pluviometro_medicao p
            where p.pluviometro_id = ${pluviometroId}`;
        connector.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        
    });
};


exports.listAll = function() {
    return new Promise(function(resolve, reject) {
        let sql = `select p.valor, p.periodo from pluviometro_medicao p`;
        connector.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        
    });
};

exports.insert = function(valor, periodo, nome, pluviometroId) {
    return new Promise(function(resolve, reject) {
        let sql = `insert into pluviometro_medicao set periodo='${periodo}', 
            valor=${valor}, nome='${nome}', pluviometro_id=${pluviometroId}`;
        connector.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        
    });
};

exports.update = function(valor, periodo, id) {
    return new Promise(function(resolve, reject) {
        let sql = `update pluviometro_medicao set periodo=${periodo}, valor=${valor}
            where pluviometro_id=${id}`;
        connector.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        
    });
};