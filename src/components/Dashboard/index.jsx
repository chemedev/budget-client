import React, { useEffect, useState } from 'react'
import Filter from '../Filter/index'
import Expense from '../Expense/index'
import Form from '../Form/index'
import Nav from '../Nav/index'

import './styles.css'

function Dashboard({ user, setUser }) {
  const [expenses, setExpenses] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [categories, setCategories] = useState([])
  const [addExpense, setAddExpense] = useState(false)
  const [edit, setEdit] = useState({})
  const [balance, setBalance] = useState(0)

  const fetchExpenses = () => {
    fetch('http://localhost:3001/expense', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Invalid token')
      })
      .then(data => {
        setExpenses(data)
        setOriginalData(data)
      })
      .catch(err => console.log(err))
  }

  const handleClick = () => setAddExpense(status => (status = !status))

  useEffect(() => {
    fetchExpenses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/category')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  useEffect(() => {
    let incomes = 0,
      outcomes = 0
    originalData.map(expense => {
      let amount = parseFloat(expense.amount)
      if (expense.isIncome) {
        return (incomes += amount)
      } else {
        return (outcomes += amount)
      }
    })
    setBalance((incomes - outcomes).toFixed(2))
  }, [originalData])

  return (
    <>
      <div className="dashboard">
        <div className="dashboard--header">
          <Nav setUser={setUser} />
          <div className="dashboard--balance">
            <h4>
              Monthly Balance: <span>${balance}</span>
            </h4>
          </div>
          <Filter
            expenses={expenses}
            setExpenses={setExpenses}
            originalData={originalData}
            categories={categories}
          />
        </div>
        <div className="dashboard--expenses">
          <button className="button--add" onClick={handleClick}>
            <i className="fas fa-plus-circle"></i>
          </button>
          {expenses.length > 0 &&
            expenses.map((expense, index) => {
              if (index < 10) {
                return (
                  <Expense
                    user={user}
                    setEdit={setEdit}
                    key={expense.id}
                    expense={expense}
                    fetchExpenses={fetchExpenses}
                    show={addExpense}
                    setShow={setAddExpense}
                  />
                )
              } else {
                return null
              }
            })}
        </div>
      </div>
      <Form
        user={user}
        show={addExpense}
        setShow={setAddExpense}
        categories={categories}
        edit={edit}
        fetchExpenses={fetchExpenses}
      />
    </>
  )
}

export default Dashboard
