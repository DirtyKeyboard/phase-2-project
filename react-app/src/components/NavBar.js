import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/browse">Browse Recipes</NavLink>
        <NavLink to="/newrecipe">New Recipe</NavLink>
        <NavLink to="/favorites">View Favorites</NavLink>
    </nav>
  )
}

export default NavBar;