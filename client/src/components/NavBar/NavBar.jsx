import React from 'react'
import  './styles.scss';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="title">REPS and SETS</h1>
      <ul className="navLinks">
        <li><Link to="/">Routines</Link></li>
        <li><Link to="/routines/add">Create Routine</Link></li>
        <li><a href="#">About</a></li>
      </ul>
      
    </nav>
  )
}
