const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");

function conectar() {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pdm1821",
    database: "ropa",
  });

  connection.connect(function (err) {
    if (err) {
      return console.error("error ");
    }
  });
  return connection;
}

app.get("/usuarios", function (req, res) {
  let connection = conectar();

  connection.query("select * from usuarios", function (err, results, fields) {
    if (err) {
      res.send("error:" + err.message);
    } else {
      res.send(results);
    }
  });
});

app.listen(8080);
