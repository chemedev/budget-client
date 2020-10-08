import React from 'react'
import './styles.css'

function Filter({ expenses, categories, setExpenses, originalData }) {
  const handleChange = e => {
    const value = parseInt(e.target.value)
    if (value === 0) return setExpenses(originalData)

    const filtered = originalData.filter(
      expense => expense.categoryId === value
    )
    setExpenses(filtered)
  }

  return (
    <div className="filter--container">
      <select
        className="filter--select"
        type="text"
        id="filter"
        name="filter"
        onChange={handleChange}
      >
        <option value={0}>Everything</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Filter
