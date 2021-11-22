import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css'

import { RoutinesContext } from '../../context';


const schema = yup.object().shape({
  routinename: yup.string().required(),
  movements: yup.array(),
});

export const RoutineForm = () => {

  const { register, handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {routineName: '',}
  });

  const { isDirty, isValid } = formState;

  const onSubmit = async (values) => {
    console.log(values)
  };//onsubmit

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formRow}>
        <label htmlFor="routineName">Routine Name:</label>
        <input
          name="routineName"
          id="routineName"
          type="text"
          {...register("routineName")}
        />
      </div>
      <div className={styles.formRow}>
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={!isValid || !isDirty}
        >Submit</button>
      </div>
    </form>
  )
}