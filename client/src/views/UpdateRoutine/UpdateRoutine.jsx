import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { NavBar, Title, PageFrame, RoutineForm } from '../../components';
import { RoutinesContext } from '../../context';

export const UpdateRoutine = () => {
  const { id } = useParams();
  const { fetchRoutines, loaded, routines } = useContext(RoutinesContext);

  useEffect(() => {
    if (!loaded) {
      fetchRoutines();
    }
  }, [loaded, fetchRoutines, routines]);

  const findRoutineToUpdate = routines.find((routine) => {
    return routine._id === id;
  });

  return (
    <>
      <NavBar />
      <Title title="Update Routine" />
      <PageFrame>
        <RoutineForm initialValues={findRoutineToUpdate} />
      </PageFrame>
    </>
  )
}

