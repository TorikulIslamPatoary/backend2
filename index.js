const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// API route
app.post("/add-student", (req, res) => {
    const { username, roll } = req.body;

    const sql = "INSERT INTO students (name, student_id) VALUES (?, ?)";
    db.query(sql, [username, roll], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }
        res.send("Student saved successfully");
    });
});

// server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
