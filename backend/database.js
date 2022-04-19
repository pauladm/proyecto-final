const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
app.use(express.static(path.join(__dirname, "ecommerce/public")));
//Añadir si se va a usar el método POST
app.use(express.json());
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

app.post("/insertusuarios", function (req, res) {
  let connection = conectar();
  console.log(req.body);
  let name = req.body.name;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  connection.query(
    "insert into usuarios(usuarios,lastName,correo,password) values(?,?,?,?)",
    [name, lastName, email, password],
    function (err, results, fields) {
      if (err) {
        res.send("error:" + err.message);
      }
    }
  );
});
app.listen(8080);
