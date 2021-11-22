import React from 'react'
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className={styles.main}>
      <h1 className={styles.title}>REPS and SETS</h1>
      <ul className={styles.navLinks}>
        <li><a href="#">Routines</a></li>
        <li><Link to="/routines/add">Create Routine</Link></li>
        <li><a href="#">About</a></li>
      </ul>
      {/* <a className="cta" href="#"><button>
        Contact
      </button></a> */}
    </nav>
  )
}
