from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from pydantic import BaseModel

from database import SessionLocal
from models import Budget
from auth import get_current_user

router = APIRouter(prefix="/budget", tags=["Budget"])


# Request Schema
class BudgetRequest(BaseModel):
    monthly_budget: float


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Set Monthly Budget
@router.post("/set")
def set_budget(data: BudgetRequest,
               db: Session = Depends(get_db),
               user_id: int = Depends(get_current_user)):

    now = datetime.now()

    # Check if budget already exists for current month
    existing_budget = db.query(Budget).filter(
        Budget.user_id == user_id,
        Budget.month == now.month,
        Budget.year == now.year
    ).first()

    if existing_budget:
        existing_budget.monthly_budget = data.monthly_budget
        db.commit()
        db.refresh(existing_budget)

        return {
            "message": "Budget updated successfully",
            "budget": existing_budget.monthly_budget
        }

    # Create new budget
    budget = Budget(
        user_id=user_id,
        monthly_budget=data.monthly_budget,
        month=now.month,
        year=now.year
    )

    db.add(budget)
    db.commit()
    db.refresh(budget)

    return {
        "message": "Budget set successfully",
        "budget": budget.monthly_budget
    }


# Get Current Budget
@router.get("/current")
def get_budget(db: Session = Depends(get_db),
               user_id: int = Depends(get_current_user)):

    now = datetime.now()

    budget = db.query(Budget).filter(
        Budget.user_id == user_id,
        Budget.month == now.month,
        Budget.year == now.year
    ).first()

    if not budget:
        return {
            "monthly_budget": 0
        }

    return budget