var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '192.185.215.94',
    user: 'tecno741_devagri',
    password: 'devagri',
    database: 'tecno741_devagri'
});

module.exports = connection;