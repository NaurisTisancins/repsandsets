import React, {useState, useEffect, useContext} from 'react';
import { RoutinesContext } from '../../../context';
import { MovementInputs } from '../MovementInputs';

export function NewSessionForm({routine}) {
    const { _id, routineName, sessions, movements } = routine;
    const { addSession } = useContext(RoutinesContext);

    
    
    return (
        <div className="sessionFormContainer">
            {JSON.stringify(movements)}
        </div>
    )
}


