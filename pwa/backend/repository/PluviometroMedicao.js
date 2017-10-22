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
        let sql = `select p.id, pl.descricao, p.valor, p.periodo, p.nome from pluviometro_medicao p
        left join pluviometro pl on (pl.id = p.pluviometro_id)`;
        connector.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        
    });
};

exports.mapList = function() {
    return new Promise(function(resolve, reject) {
        let sql = `select sum(m.valor) as total, m.pluviometro_id, p.descricao, p.latitude, p.longitude from pluviometro_medicao m
        left join pluviometro p on (m.pluviometro_id = p.id)
        group by m.pluviometro_id`;
        connector.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        
    });
   
}

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