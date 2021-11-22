import React, { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { RoutinesContext } from '../../context';

export const RoutineList = () => {
  const { routines, loaded, loading, error, fetchRoutines } = useContext(RoutinesContext);

  useEffect(() => {
    if (!loading && !loaded) {
      fetchRoutines()
    }
    // console.log("in useEffect", routines, loaded, loading)
  }, [loading, loaded, fetchRoutines, routines]);


  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.main}>
      {routines.map((routine) => {
        return <div>{JSON.stringify(routine, null, 2)}</div>
      })}
    </div>
  )
}