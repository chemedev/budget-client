import React from 'react'
import './styles.css'

function Expense({ user, setEdit, expense, fetchExpenses, show, setShow }) {
  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    let resp = confirm('Are you sure?')
    if (resp) {
      fetch('http://localhost:3001/expense', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ id: expense.id })
      }).then(() => fetchExpenses())
    }
  }
  const handleEdit = expense => {
    setEdit(expense)
    setShow(true)
  }
  return (
    <div
      className={
        expense.isIncome
          ? 'expense--container income'
          : 'expense--container outcome'
      }
    >
      <div className="expense--actions">
        <div className="button--edit" onClick={() => handleEdit(expense)}>
          <i className="far fa-edit"></i>
        </div>
        <div className="button--delete" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
      <h4>{expense.concept}</h4>
      <div className="expense--data">
        <span
          className={
            expense.isIncome ? 'expense--type income' : 'expense--type outcome'
          }
        >
          {expense.isIncome ? `$${expense.amount}` : `-$${expense.amount}`}
        </span>
        <span className="expense--date">
          {Intl.DateTimeFormat('es-ES').format(new Date(expense.date))}
        </span>
      </div>
    </div>
  )
}

export default Expense
