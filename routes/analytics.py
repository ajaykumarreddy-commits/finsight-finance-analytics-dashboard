from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Expense
from auth import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/monthly/{year}/{month}")
def monthly_expense(year: int, month: int,
                    db: Session = Depends(get_db),
                    user_id: int = Depends(get_current_user)):

    expenses = db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()

    total = 0

    for exp in expenses:
        if exp.date.startswith(f"{year}-{month:02}"):
            total += exp.amount

    return {
        "month": f"{year}-{month:02}",
        "total_spent": total
    }

@router.get("/category")
def category_expense(db: Session = Depends(get_db),
                     user_id: int = Depends(get_current_user)):

    expenses = db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()

    category_totals = {}

    for exp in expenses:
        if exp.category not in category_totals:
            category_totals[exp.category] = 0
        category_totals[exp.category] += exp.amount

    return category_totals

@router.get("/daily/{year}/{month}")
def daily_expense(year: int, month: int,
                  db: Session = Depends(get_db),
                  user_id: int = Depends(get_current_user)):

    expenses = db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()

    daily_totals = {}

    for exp in expenses:
        # If date matches the specified month
        if exp.date.startswith(f"{year}-{month:02}"):
            day = exp.date  # example: "2026-02-20"
            if day not in daily_totals:
                daily_totals[day] = 0
            daily_totals[day] += exp.amount

    return daily_totals