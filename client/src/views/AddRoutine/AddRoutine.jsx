import React from 'react';
import { NavBar, RoutineForm, PageFrame, Title } from '../../components';
// import './styles.scss';

export const AddRoutine = () => {
  return (
    <>
      <NavBar />
      <Title title="Create Routine" />
      <PageFrame>
        <RoutineForm />
      </PageFrame>
    </>
  )
}