import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // XAMPP default user
  password: "",       // leave blank unless you set one
  database: "f1_lms"  // your DB name from phpMyAdmin
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL (XAMPP)");
});

export default db;
