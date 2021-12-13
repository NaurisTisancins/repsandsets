import React from 'react'

export const MovementInputs = ({ movement }) => {
    
    if (!movement) return null;
    return (
        <div>
            {movement.name}
        </div>
    )
}


