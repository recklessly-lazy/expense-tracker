import React from 'react'
import styles from './ExpensePage.module.scss'
import ExpensesList from '../../components/ExpensesList/ExpensesList'

function ExpensePage() {
  return (
      <div className={styles.mainContent}>
          <ExpensesList />
          {/* <Expe */}
    </div>
  )
}

export default ExpensePage