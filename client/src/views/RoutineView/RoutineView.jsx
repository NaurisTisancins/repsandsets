import React, { useState, useEffect, useContext } from 'react'
import { NavBar, PageFrame, Routine } from '../../components';
import { useParams } from 'react-router-dom';
import { RoutinesContext } from '../../context';


export function RoutineView() {
  const { id } = useParams();
  const { routines, fetchRoutines, loading, loaded, error } = useContext(RoutinesContext);
  const [routine, setRoutine] = useState(null);


  useEffect(() => {
    if (!loading || !loaded) {
      fetchRoutines();
    }
    if (routines.length !== 0) {
      let index = routines.findIndex((routine) => {
        return id === routine._id;
      })
      setRoutine(() => {
        return ({
          ...routine,
          ...routines[index],
        })
      });
    }
  }, [fetchRoutines, setRoutine, routines])

  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <NavBar />
      <PageFrame className="routineViewPageFrame">
        {routine && <Routine routine={routine} />}
      </PageFrame>
    </>
  )
}

//title={routine ? `${routine.routineName}` : `Loading...`}
