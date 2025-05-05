const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "API ready to go", "SUCCESS", res);
});

app.get("/mahasiswa", (req, res) => {
  sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "mahasiswa get list", res);
  });
});
app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "data spesifik mahasiswa", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;

  const sql = `INSERT INTO mahasiswa(nim,nama_lengkap,kelas,alamat) VALUES (?,?,?,?)`;

  db.query(sql, [nim, nama_lengkap, kelas, alamat], (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "data added successfuly", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nama_lengkap, kelas, alamat, nim } = req.body;
  const sql = `UPDATE mahasiswa set nama_lengkap = (?), kelas= (?),alamat = (?) WHERE nim = (?)`;

  db.query(sql, [nama_lengkap, kelas, alamat, nim], (err, fields) => {
    console.log(fields);
  });

  response(200, "update test", "halaman put", res);
});

app.delete("/mahasiswa", (req, res) => {
  response(200, "halaman delete", res);
});

app.listen(port, () => {
  console.log(`web connect to port ${port}`);
});
