
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err.message);
    return;
  }
  console.log("MySQL connected ✅");
});


// API route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
app.post("/add-student", (req, res) => {
    console.log("Data received:", req.body);
    res.json({ success: true });
});

app.post("/add-student", (req, res) => {
    const { username, roll } = req.body;

    const sql = "INSERT INTO students (name, student_id) VALUES (?, ?)";

    db.query(sql, [username, roll], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }
        res.json({
            success: true,
            message: "Student saved successfully",
            id: result.insertId
        });
    });
});

// server start
const PORT = process.env.MYSQLPORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
