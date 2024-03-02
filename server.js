const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "mydb",
});

con.connect((err) => {
  if (err) throw err;
  console.log("connected!!");
});

app.get("/names", (req, res) => {
  var query = "SELECT * FROM employee";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.json({ msg: result });
    console.log(result);
  });
});

app.post("/save", (req, res) => {
  const { name, address } = req.body;
  var query = `INSERT INTO employee (name, address) VALUES('${name}', '${address}')`;
  con.query(query, (err, result, field) => {
    if (err) throw err;
    res.json({ msg: "user add successfully" });
    console.log("query:", result);
  });
});

app.listen(9000, () => {
  console.log("server running on 9000...");
});
