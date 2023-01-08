import React from 'react'
import { Expense } from '../../models/Expense'

function ExpenseItem({expense}: {expense: Expense}) {
  return (
    <div>{expense.title}: {expense.amount}</div>
  )
}

export default ExpenseItem