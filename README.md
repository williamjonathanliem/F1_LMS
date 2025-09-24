# 🏎️ F1 Strategy LMS – Capstone Project  

## 📖 Overview  
This is my **AI-Powered Learning Management System (LMS)** built as the capstone project for the **Full Stack Development with AI** program.  
The system simulates a Formula 1 strategy training platform where users can:  
- Sign up / Log in  
- Enroll in lessons  
- Complete quizzes  
- Track progress on a personal dashboard  
- Run strategy simulations  
- Leverage **Smart Search (AI)** for improved learning experiences  

The project demonstrates **frontend, backend, and database integration** with additional AI-powered features.  

---

## 🛠️ Tech Stack  

### Frontend  
- **React.js** (with React Router)  
- **Bootstrap 5** for UI components  
- **Context API** for state management (Auth & Progress)  

### Backend  
- **Node.js + Express.js**  
- RESTful APIs for users, courses, lessons, quizzes, and authentication  
- Error handling & validation  

### Databases  
- **MySQL (XAMPP)** → User, Courses, Lessons, Progress tracking  
- **MongoDB** → AI/Smart Search experiments & demo collections  

### Authentication  
- **JWT**-based authentication  
- **bcrypt.js** for password hashing  

---

## 📂 Project Structure  

```
Capstone_WilliamJonathan/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Dashboard, Navbar, Courses, Lesson, Quiz, Simulator
│   │   ├── context/         # AuthContext & ProgressContext
│   │   ├── pages/           # Login & Signup forms
│   │   ├── App.js           # Router with Protected Routes
│   │   └── index.js
│   └── package.json
│
├── server/                  # Express backend
│   ├── routes/              # auth.js, courses.js, quiz.js, users.js
│   ├── db.js                # MySQL connection
│   ├── server.js            # Entry point
│   └── package.json
│
├── mysql/                   # SQL commands for Section 3
│   ├── schema.sql           # CREATE TABLEs
│   └── seed.sql             # INSERT sample data
│
├── mongo/                   # MongoDB screenshots and commands
│   └── Capstone_Section3_MongoDB_Jonathan.pdf
│
├── Capstone_Section1_HTML_Jonathan.html
├── Capstone_Section1_JS_Jonathan.html
├── Capstone_Section1_React_Jonathan.zip
├── Capstone_Section2_Jonathan.zip
├── Capstone_Section3_Jonathan.zip
├── Capstone_Section3_SQL_Jonathan.pdf
├── Capstone_Section4_Jonathan.pdf
└── README.md
```

---

## 🚀 Features  

### ✅ Section 1 – Frontend  
- Built responsive UI with **HTML, CSS, and Bootstrap**  
- JS features: email validation, dynamic input events, password strength checker  
- React components: course description toggle, quiz flow, simulator  

### ✅ Section 2 – Backend  
- Developed **RESTful APIs** using Express.js  
- Implemented error handling for missing fields  
- Added `POST /enroll` and authentication routes  

### ✅ Section 3 – Database  
- **MySQL**: Users, Courses, Lessons, Progress tables  
- **SQL Queries**: Instructor table creation, user enrollment, JOIN queries  
- **MongoDB**: Insert demo data for Smart Search  

### ✅ Section 4 – AI Features  
- Explained **Smart Search vs Standard Search**  
- Documented integration between frontend, backend, and databases  
- Discussed potential challenges & conceptual solutions  

---

## 📸 Screenshots to Include  
1. Section 1 – HTML layout, Flexbox, Bootstrap Cards  
2. Section 1 – JS features (validation, events, password strength)  
3. Section 1 – React app running (Dashboard, Courses, Lessons, Quiz)  
4. Section 2 – Express API tested in Postman (`/api/courses`, `/api/auth/login`)  
5. Section 3 – MySQL Workbench with schema + queries  
6. Section 3 – MongoDB Compass / Shell showing inserted data  
7. Section 4 – PDF explanation of Smart Search  

---

## ⚡ Installation  

1. Clone the repo  
```bash
git clone https://github.com/williamjonathanliem/F1_LMS.git
cd F1-Strategy-LMS
```

2. Install dependencies  
```bash
cd client && npm install
cd ../server && npm install
```

3. Configure **MySQL** in `server/db.js`  
```js
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "f1_lms"
});
```

4. Run backend  
```bash
cd server
node server.js
```

5. Run frontend  
```bash
cd client
npm start
```

---

## 📚 Learning Outcomes Covered  

- Build responsive UIs (HTML, CSS, Bootstrap)  
- Add interactivity with JavaScript and React  
- Develop RESTful APIs with Express.js  
- Manage MySQL + MongoDB databases  
- Prototype AI-powered **Smart Search**  

---

✍️ Author: **William Jonathan**  
📅 Submission: Capstone Project – Section 1–4  
