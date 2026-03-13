from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Expense
from schemas import ExpenseCreate
from auth import get_current_user

router = APIRouter(prefix="/expenses", tags=["Expenses"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add")
def add_expense(expense: ExpenseCreate, 
                db: Session = Depends(get_db),
                user_id: int = Depends(get_current_user)):

    new_exp = Expense(
        amount=expense.amount,
        category=expense.category,
        description=expense.description,
        date=expense.date,
        user_id=user_id
    )

    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)

    return {"message": "Expense added successfully", "expense_id": new_exp.id}

@router.get("/all")
def get_all_expenses(db: Session = Depends(get_db),
                     user_id: int = Depends(get_current_user)):

    expenses = db.query(Expense).filter(Expense.user_id == user_id).all()

    return expenses

@router.put("/update/{expense_id}")
def update_expense(expense_id: int,
                   updated_data: ExpenseCreate,
                   db: Session = Depends(get_db),
                   user_id: int = Depends(get_current_user)):

    expense = db.query(Expense).filter(Expense.id == expense_id,
                                       Expense.user_id == user_id).first()

    if not expense:
        return {"error": "Expense not found or not authorized"}

    expense.amount = updated_data.amount
    expense.category = updated_data.category
    expense.description = updated_data.description
    expense.date = updated_data.date

    db.commit()
    db.refresh(expense)

    return {"message": "Expense updated successfully"}

@router.delete("/delete/{expense_id}")
def delete_expense(expense_id: int,
                   db: Session = Depends(get_db),
                   user_id: int = Depends(get_current_user)):

    expense = db.query(Expense).filter(Expense.id == expense_id,
                                       Expense.user_id == user_id).first()

    if not expense:
        return {"error": "Expense not found or not authorized"}

    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}