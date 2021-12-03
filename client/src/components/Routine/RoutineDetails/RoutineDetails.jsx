import React from 'react'
import './styles.scss';

export const RoutineDetails = ({ routine }) => {
  return (
    <div className="detailContainer">
      <div className="routineMovements">
        <h3>Movements: </h3>
        <ul className="movementList">
          {routine.movements.map(({ name, _id }) => {
            return (
              <div className="itemRow">
                <li
                  className="movementListItem"
                  key={_id}>{name}</li>
                <button className="statBtn">Statistics</button>
              </div>
            )
          })}
        </ul>
        <div className="itemRow">
          <button className="addMovementBtn">Add Movement</button>
        </div>
      </div>
    </div>
  )
}


