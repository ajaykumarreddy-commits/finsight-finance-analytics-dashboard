# 💰 FinSight – Personal Finance Analytics Dashboard

A modern **Full Stack Personal Finance Management Application** that helps users securely track expenses, manage monthly budgets, visualize spending trends, and gain financial insights through an intuitive analytics dashboard.

---

## 🚀 Live Demo

🌐 https://finsight-finance-analytics-dashboar.vercel.app



# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

---

## 💰 Expense Management

- Add Expenses
- Update Expenses
- Delete Expenses
- Search Expenses
- Export Expenses as CSV

---

## 📊 Analytics

- Monthly Spending Analysis
- Daily Spending Trends
- Interactive Charts
- Expense Summary

---

## 💸 Budget Management

- Set Monthly Budget
- Remaining Budget Calculation
- Budget Usage Progress Bar
- Spending Alerts

---

## 🤖 Financial Insights

- Top Spending Category
- Average Daily Spending
- Predicted Monthly Spending

---

# 🛠 Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router
- Chart.js
- Axios

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib
- Python

## Database

- PostgreSQL (Neon)

## Deployment

- Vercel (Frontend)
- Render (Backend)

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
FinSight/
│
├── expense-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── routes/
├── models.py
├── database.py
├── auth.py
├── schemas.py
├── main.py
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ajaykumarreddy-commits/finsight-finance-analytics-dashboard.git
```

---

## Backend Setup

```bash
cd finsight-finance-analytics-dashboard

python -m venv venv

venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
DATABASE_URL=your_postgresql_database_url
```

Run backend

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd expense-frontend

npm install
```

Create a `.env` file

```env
REACT_APP_API_URL=http://localhost:8000
```

Run frontend

```bash
npm start
```

---

# 🔒 Authentication

The application uses **JWT Authentication**.

Users must log in before accessing:

- Expense Management
- Analytics
- Budget Tracker
- Financial Insights

---

# 🌐 Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- Neon PostgreSQL

---

# 📈 Future Enhancements

- AI-powered Expense Prediction
- OCR Bill Scanner
- Email Reports
- Multi-Currency Support
- Dark Mode
- Expense Categories with Icons
- Monthly PDF Reports
- Mobile Responsive Dashboard
- Recurring Expense Tracking

---

# 👨‍💻 Author

**Ajay Kumar Reddy**

GitHub:
https://github.com/ajaykumarreddy-commits

LinkedIn:
https://www.linkedin.com/in/ajay-kumar-reddy-golamari-869649374

---

# ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.
