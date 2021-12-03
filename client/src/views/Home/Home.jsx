import React from 'react';
import { NavBar, RoutineList, PageFrame, Title } from '../../components';
// import './styles.scss';

export const Home = () => {
  return (
    <>
      <NavBar />
      <Title title="Routines"/>
      <PageFrame>
        <RoutineList />
      </PageFrame>
    </>
  )
}