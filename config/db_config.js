const mysql = require('mysql2');

// create the connection to database
var connection= mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password:'plutosone123',
  password:'',
  database: 'vms'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("vms connected")
});

module.exports=connection;