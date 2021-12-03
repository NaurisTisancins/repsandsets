import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { RoutinesContext } from '../../context';

export const RoutineList = () => {
  const { routines, loaded, loading, error, fetchRoutines, removeRoutine } = useContext(RoutinesContext);

  useEffect(() => {
    if (!loading && !loaded) {
      fetchRoutines()
    }
    // console.log("in useEffect", routines, loaded, loading)
  }, [loading, loaded, fetchRoutines, routines]);


  const handleDelete = (id) => {
    removeRoutine(id);
  };

  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="routinelist">
      <ul className="list">
        {routines.map(routine => {
          return (
            <li
              key={routine._id}
              className="listitem">
              <Link
                className="link"
                to={`/routines/${routine._id}`}>
                {routine.routineName}
              </Link>
              <button
                onClick={() => handleDelete(routine._id)}
                className="deleteBtn">X</button>
            </li>
          )
        })}
      </ul>
      <Link className="link" to="/routines/add">
        <button className="addRoutineBtn">
          Add Routine
        </button>
      </Link>
    </div>
  )
}