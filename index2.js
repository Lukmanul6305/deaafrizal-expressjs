const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 40000;

("Connect ke database");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coba_database",
});

db.connect((err) => {
  if (err) console.log("database error");
  else console.log("databasae valid");
});
("==================================================");
("response");
const response = (statusCode, data, pesan, res) => {
  res.status(statusCode).json([
    {
      payload: data,
      pesan,
      metadata: {
        prev: "",
        next: "",
        currend: "",
      },
    },
  ]);
};

app.use(express.json());

app.get("/", (req, res) => {
  const sql = `SELECT * FROM mahasiswa`;
  db.query(sql, (err, fields) => {
    if (err) response(500, err, "all data invalid", res);
    response(200, fields, "all data valid", res);
  });
});

app.post("/", (req, res) => {
  const { nim, nama, kelas, alamat } = req.body;
  const sql = `INSERT INTO mahasiswa(nim,nama_lengkap,kelas,alamat) values(?,?,?,?)`;
  db.query(sql, [nim, nama, kelas, alamat], (err, fields) => {
    if (err) {
      response(200, err, "data gagal", res);
    } else {
      response(200, fields, "data berhasil", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Database connected port ${port}`);
});
