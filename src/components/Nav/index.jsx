import React from 'react'
import './styles.css'

function Nav({ setUser }) {
  const handleLogout = () => {
    setUser('')
  }
  return (
    <nav>
      <h2>Budget Tracker</h2>
      <button title="Logout" className="button--logout" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        Logout
      </button>
    </nav>
  )
}

export default Nav
