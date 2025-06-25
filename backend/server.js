import express from "express";
import mysql from "mysql";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(express.json());
app.listen(8000, () => {
  console.log("8000 번 서버 호출");
});

app.use(cors(3000));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.DB_user,
  password: process.env.DB_password,
  port: "3306",
  database: process.env.DB_name,
});

db.connect((err) => {
  console.log("db 연결 성공");
  console.log("err", err);
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;
  const sql = "insert into users(name , age) values(?,?)";
  db.query(sql, [name, age], (err, results, fields) => {
    console.log("err", err);
    console.log("results", results);
    console.log("fields", fields);

    if (err) {
      console.error("데이터베이스 쿼리 중 에러 발생:", err);
      res.status(500).json({ message: "데이터 저장 실패", error: err.message });
    } else {
      res.status(201).json({
        message: "데이터 저장 성공",
        id: results.insertId,
        name: name,
        age: age,
      });
    }
  });
});
