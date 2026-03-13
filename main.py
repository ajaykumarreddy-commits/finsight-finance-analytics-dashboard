from fastapi import FastAPI
from routes import users
from routes import users, expenses
from routes import analytics
from fastapi.middleware.cors import CORSMiddleware
from routes import budget
from database import engine
from models import Base
from routes import insights

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)

@app.get("/")
def home():
    return {"message": "Backend is working!"}

app.include_router(users.router)
app.include_router(expenses.router)
app.include_router(analytics.router)
app.include_router(budget.router)
app.include_router(insights.router)

Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)