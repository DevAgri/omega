var connector = require("../utils/connector.js");

exports.list = function() {
    return new Promise(function(resolve, reject) {
        let sql = `select p.descricao, p.latitude, p.longitude from pluviometro p`;
        connector.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        
    });
}; 

