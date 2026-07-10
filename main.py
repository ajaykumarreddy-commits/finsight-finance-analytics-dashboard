from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base
from routes import users, expenses, analytics, budget, insights

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:3000",
    "https://finsight-finance-analytics-dashboar.vercel.app",
    "https://finsight-finance-analytics-dashboard-jrc4kwist-finsight3.vercel.app",
]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(expenses.router)
app.include_router(analytics.router)
app.include_router(budget.router)
app.include_router(insights.router)

@app.get("/")
def home():
    return {"message": "Backend is working!"}