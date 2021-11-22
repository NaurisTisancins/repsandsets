import React from 'react'
import styles from './styles.module.css';
import { ToastProvider } from 'react-toast-notifications';
import { Routes, Route, Link } from "react-router-dom";
import { Home, AddRoutine } from '../../views';
import { RoutinesProvider } from '../../context';

export const App = () => {
  return (

    <ToastProvider>
      <RoutinesProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/routines/add" element={<AddRoutine />} />
          <Route path="*" element={<Home/>}/>
        </Routes>
      </RoutinesProvider>
    </ToastProvider>


  )
}

