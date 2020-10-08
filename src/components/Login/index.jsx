import React, { useState } from 'react'

import './styles.css'

function Login({ setUser, history }) {
  const [input, setInput] = useState({ email: '', password: '', error: '' })

  const handleChange = e => {
    const { name, value } = e.target
    setInput(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    let endpoint = ''
    if (e.target.innerHTML === 'Login')
      endpoint = 'http://localhost:3001/user/login'
    else endpoint = 'http://localhost:3001/user'

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Invalid credentials')
        } else {
          return res.json()
        }
      })
      .then(data => {
        setUser(data)
        localStorage.token = data.token
        history.push('/dashboard')
      })
      .catch(err => {
        setInput(prev => ({ ...prev, error: err.message }))
      })
  }

  return (
    <div className="login--container">
      <span className="login--avatar" role="img" aria-hidden>
        🔓
      </span>
      <form className="login--form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <span className="error">{input.error}</span>
        <button className="button" type="submit" onClick={handleSubmit}>
          Login
        </button>
        <button
          className="button button--signup"
          type="submit"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </form>
    </div>
  )
}

export default Login
