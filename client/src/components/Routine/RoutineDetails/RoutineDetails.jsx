import React from 'react';
import { Link } from 'react-router-dom';
import './../../../styles/routine-details.styles.scss';

export const RoutineDetails = ({ routine }) => {
  console.log(routine)
  return (
    <div className="detailContainer">
      <div className="routineMovements">
        <h3>{routine.name} - Details </h3>
        <ul className="movementList">
          {routine && JSON.stringify(routine, null, 2)}
        </ul>
        <div className="itemRow">
          <Link
          to={`/routines/update/${routine._id}`}
          ><button className="addMovementBtn">Add Movement</button></Link>
        </div>
      </div>
    </div>
  )
}


