import React, {useState, useContext} from 'react';
import { RoutinesContext } from '../../../context';
import { MovementInputs } from '../MovementInputs';

export function NewSessionForm(props) {
    const { _id, routineName, sessions, movements } = props.routine;
    const { addSession } = useContext(RoutinesContext);
    const [routine, setRoutine] = useState(props.routine)
    console.log(movements)
    return (
        <div className="sessionFormContainer">
            {routine && movements.map(movement => {
                return (
                    <MovementInputs key={movement._id} movement={movement} />
                )
            })}
        </div>
    )
}


