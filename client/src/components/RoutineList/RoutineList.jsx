import React, { useState, useEffect, useContext } from 'react';
import './../../styles/routine-list.styles.scss';
import { Link } from 'react-router-dom';
import { RoutinesContext } from '../../context';

export const RoutineList = () => {
  const { routines, loaded, loading, error, fetchRoutines, removeRoutine } = useContext(RoutinesContext);

  useEffect(() => {
    if (!loading && !loaded && !routines.length) {
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
    <div className="routine-list">
      <ul className="routine-list__list">
        {routines.map(routine => {
          return (
            <li
              key={routine._id}
              className="routine-list__list-item">
              <Link
                className="routine-list__link"
                to={`/routines/${routine._id}`}>
                {routine.name}
              </Link>
              <button
                onClick={() => handleDelete(routine._id)}
                className="routine-list__delete-btn">x</button>
              <Link
                className="routine-list__link"
                to={`/routines/update/${routine._id}`}
              >
                <button className="routine-list__edit-btn">edit</button>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link className="routine-list__link--add-routine" to="/routines/add">
        <button className="button routine-list__add-btn">
          Add Routine
        </button>
      </Link>
    </div>
  )
}