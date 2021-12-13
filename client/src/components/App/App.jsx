import React from 'react'
import './styles.scss';
import { ToastProvider } from 'react-toast-notifications';
import { Routes, Route, Link } from "react-router-dom";
import { Home, AddRoutine, UpdateRoutine, RoutineView } from '../../views';
import { RoutinesProvider } from '../../context';

export const App = () => {
  return (

    <ToastProvider>
      <RoutinesProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/routines/add" element={<AddRoutine />} />
          <Route exact path="/routines/update/:id" element={<UpdateRoutine />} />
          <Route exact path="/routines/:id" element={<RoutineView />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </RoutinesProvider>
    </ToastProvider>



  )
}

