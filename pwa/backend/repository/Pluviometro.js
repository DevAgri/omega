var connector = require("./utils/connector.js");

connector.connect();

connector.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connector.end();