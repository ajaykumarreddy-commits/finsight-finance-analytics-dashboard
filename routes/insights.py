from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from collections import defaultdict

from database import SessionLocal
from models import Expense
from auth import get_current_user

router = APIRouter(prefix="/insights", tags=["Insights"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/summary")
def financial_insights(
        db: Session = Depends(get_db),
        user_id: int = Depends(get_current_user)):

    expenses = db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()

    if not expenses:
        return {
            "top_category": "None",
            "average_daily_spend": 0,
            "predicted_monthly_spend": 0
        }

    category_totals = defaultdict(float)
    total_spent = 0

    for exp in expenses:
        category_totals[exp.category] += exp.amount
        total_spent += exp.amount

    top_category = max(category_totals, key=category_totals.get)

    days = len(set([exp.date for exp in expenses]))

    avg_daily = total_spent / days if days else 0

    predicted_month = avg_daily * 30

    return {
        "top_category": top_category,
        "average_daily_spend": round(avg_daily,2),
        "predicted_monthly_spend": round(predicted_month,2)
    }