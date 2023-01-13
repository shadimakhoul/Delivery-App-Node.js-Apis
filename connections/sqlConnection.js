const mysql = require ("mysql");
// sql Connection
var con = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"shadi.12345",
  database:"mydb",
  timezone: 'uct+02:00'
})

module.exports.con = con
