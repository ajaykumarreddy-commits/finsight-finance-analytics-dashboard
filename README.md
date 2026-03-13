# FinSight – AI-Driven Personal Finance Analytics Dashboard

FinSight is a full-stack financial analytics dashboard that helps users **track expenses, manage budgets, and analyze spending patterns** through interactive visualizations.

This project demonstrates **full-stack development using React and FastAPI**, secure authentication with JWT, and financial data analytics using charts.

---

## Key Features

- Secure JWT Authentication  
- Expense Management (Add / Edit / Delete)  
- Monthly Budget Tracking  
- Financial Analytics Dashboard  
- Category, Daily & Monthly Expense Charts  
- CSV Export for Expense Reports  

---

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Chart.js

**Backend**
- FastAPI
- SQLAlchemy
- JWT Authentication

**Database**
- SQLite

---

## Architecture

```
React Frontend
      │
      ▼
FastAPI Backend
      │
      ▼
SQLite Database
```

---

## Run the Project

### Backend
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on  
`http://127.0.0.1:8000`

---

### Frontend
```bash
cd expense-frontend
npm install
npm start
```

Frontend runs on  
`http://localhost:3000`

---

## Author
Ajay Kumar Reddy  
B.Tech – Computer Science (AI & Data Science)

---

## Repository
https://github.com/ajaykumarreddy-commits/finsight-finance-analytics-dashboard
