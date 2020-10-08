import React, { useEffect, useState } from 'react'
import './styles.css'

function Form({ user, show, setShow, categories, edit, fetchExpenses }) {
  // eslint-disable-next-line no-extend-native
  Date.prototype.toDateInputValue = function () {
    let local = new Date(this)
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset())
    return local.toJSON().slice(0, 10)
  }
  const defaultValues = {
    id: '',
    concept: '',
    amount: '',
    date: new Date().toDateInputValue(),
    isIncome: false,
    categoryId: 1,
    errors: {
      concept: '',
      amount: ''
    }
  }

  const [input, setInput] = useState(defaultValues)

  useEffect(() => {
    setInput(prev => ({ ...prev, ...edit }))
  }, [edit])

  const handleChange = e => {
    const name = e.target.name
    let value = e.target.value
    if (name === 'isIncome') value = e.target.checked
    let errors = input.errors

    switch (name) {
      case 'concept':
        errors.concept =
          value.length < 3 ? 'Concept must be at least 3 chrs' : ''
        break
      case 'amount':
        errors.amount =
          isNaN(value) || value <= 0
            ? 'Amount must be a number greater than 0'
            : ''
        break
      case 'reset':
        setInput(defaultValues)
        setShow(status => (status = !status))
        break
      default:
        break
    }
    setInput(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    let valid = true
    Object.values(input.errors).forEach(err => {
      err.length > 0 && (valid = false)
    })
    if (valid) {
      let httpMethod = ''
      input.amount = parseFloat(input.amount)
      input.categoryId = parseInt(input.categoryId)
      const data = {
        concept: input.concept,
        amount: input.amount,
        date: input.date,
        isIncome: input.isIncome,
        categoryId: input.categoryId
      }
      if (input.id) {
        data.id = input.id
        httpMethod = 'PUT'
      } else {
        httpMethod = 'POST'
      }

      fetch('http://localhost:3001/expense', {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      }).then(() => fetchExpenses())
      setInput(defaultValues)
      setShow(status => (status = !status))
    } else {
      console.log('invalid')
    }
  }

  return (
    <div className={show ? 'form--container show' : 'form--container'}>
      <form className="form--add" onSubmit={handleSubmit}>
        <input type="text" id="id" value={input.id} onChange={handleChange} />
        <div className="form--input">
          <label htmlFor="concept">Concept</label>
          <input
            name="concept"
            id="concept"
            type="text"
            placeholder="Stuff..."
            onChange={handleChange}
            value={input.concept}
          />
          {input.errors.concept && (
            <span className="error">{input.errors.concept}</span>
          )}
        </div>

        <div className="form--input">
          <label htmlFor="amount">Amount</label>
          <input
            name="amount"
            id="amount"
            type="text"
            placeholder="$1337"
            onChange={handleChange}
            value={input.amount}
          />
          {input.errors.amount && (
            <span className="error">{input.errors.amount}</span>
          )}
        </div>
        <div className="form--input">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleChange}
            value={input.date}
          />
        </div>
        <div className="form--input">
          <label htmlFor="category">Category</label>
          <select
            name="categoryId"
            onChange={handleChange}
            value={input.categoryId}
            id="category"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form--input">
          <label htmlFor="isIncome">Is this an income?</label>
          <input
            name="isIncome"
            type="checkbox"
            id="isIncome"
            onChange={handleChange}
            checked={input.isIncome}
          />
        </div>
        <div className="form--actions">
          <button className="button" type="submit">
            {input.id ? 'Update' : 'Add'}
          </button>
          <button
            className="button button--cancel"
            type="reset"
            name="reset"
            onClick={handleChange}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
