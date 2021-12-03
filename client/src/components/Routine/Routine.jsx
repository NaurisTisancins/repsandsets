import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { NewSessionForm } from './NewSessionForm';
import { SessionList } from './SessionList';
import { RoutineDetails } from './RoutineDetails';


export function Routine(props) {
  const { routine } = props;
  const { movements, sessions, routineName } = routine;
  const [state, setState] = useState({
    isNewSession: true,
    isHistory: false,
    isRoutineDetails: false,
  });

  let routineDisplayOptions;

  const setNewSession = () => {
    setState({
      ...state,
      isNewSession: true,
      isHistory: false,
      isRoutineDetails: false,
    })
  };//setNewSession

  const setHistory = () => {
    setState({
      ...state,
      isNewSession: false,
      isHistory: true,
      isRoutineDetails: false,
    })
  };//setHistory

  const setRoutineDetails = () => {
    setState({
      ...state,
      isNewSession: false,
      isHistory: false,
      isRoutineDetails: true,
    })
  };//setRoutineDetails

  if (state.isNewSession) {
    routineDisplayOptions = <NewSessionForm />
  }
  if (state.isHistory) {
    routineDisplayOptions = <SessionList />
  }
  if (state.isRoutineDetails) {
    routineDisplayOptions = <RoutineDetails routine={routine} />
  }

  return (
    <div className="routineContainer">
      <div className="routineSidebarMenu">
        <h2>{routineName}</h2>
        <ul className="routineMenuList">
          <li
            onClick={setNewSession}
            className={state.isNewSession ? "routineMenuItems selected" : "routineMenuItems"}>New Session</li>
          <li
            onClick={setHistory}
            className={state.isHistory ? "routineMenuItems selected" : "routineMenuItems"}>History</li>
          <li
            onClick={setRoutineDetails}
            className={state.isRoutineDetails ? "routineMenuItems selected" : "routineMenuItems"}>Routine Details</li>
        </ul>
      </div>
      <div className="contentDisplay">
        {routineDisplayOptions}
      </div>
    </div>
  )
}

