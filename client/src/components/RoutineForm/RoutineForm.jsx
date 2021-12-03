import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import './styles.scss'

import { RoutinesContext } from '../../context';

// daysOfWeek: Yup.array()
//   .of(
//     Yup.object().shape({
//       dayOfWeek: Yup.string(),
//       checked: Yup.boolean(),
//     })
//   )

const schema = yup.object().shape({
  routineName: yup.string().required(),
  movements: yup.array()
    .of(
      yup.object().shape({
        name: yup.string(),
      })
    )
});

export const RoutineForm = () => {
  const { createRoutine } = useContext(RoutinesContext)
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { routineName: '', movements: [] }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "movements",
  })

  const { isDirty, isValid } = formState;

  const onSubmit = (values) => {
    console.log("routineForm values", values)
    createRoutine(values);
    reset();
    navigate("/");
  };//onsubmit

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__group field">
        <input
          className="form__field"
          id="routineName"
          type="text"
          {...register("routineName")}
        />
        <label className="form__label">Routine name: </label>
      </div>

      <p>Add movements to your routine</p>

      {fields.map(({ id }, index) => {
        return (
          <div className="form__group field movement" key={id}>
            <>
              <input
                className="form__field"
                name={`movements.${index}.name`}
                type="text"
                {...register(`movements.${index}.name`)}
              />
              <label className="form__label">Movement name: </label>
            </>
            <button onClick={() => remove(index)}>Remove</button>
          </div>
        )
      })}


      <div className="buttonarea">
        <button
          className="submitbtn"
          type="submit"
        // disabled={!isValid || !isDirty}
        >Submit</button>
        <button
          type="button"
          onClick={() => append({})}
        >Add Movement</button>
      </div>
    </form>
  )
}