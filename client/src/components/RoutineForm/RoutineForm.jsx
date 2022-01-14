import React, { useState, useContext, useEffect } from 'react';
import { RoutineSchema } from "../../yupSchemas";
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useForm,
  FormProvider,
} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import './../../styles/form.styles.scss';
import { SessionPlanFormArray } from '.';


import { RoutinesContext } from '../../context';

export const RoutineForm = ({ initialValues }) => {
  const { createRoutine, updateRoutine } = useContext(RoutinesContext)
  const [populated, setPopulated] = useState(false);
  const navigate = useNavigate();

  let defaultValues = {
    name: "",
    units: "kg",
    sessionPlan:
      [{
        name: "",
        sessionFocus: "Volume",
        selectedExercises:
          [{
            exercise: "",
            repRange: {
              min: "",
              max: "",
            }
          }]
      }]
  }

  // const {  name } = initialValues;

  const methods = useForm({
    resolver: yupResolver(RoutineSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const { error, isDirty, isValid } = methods.formState;

  useEffect(() => {
    if (initialValues && !populated) {
      methods.reset({
        ...initialValues,
      });
      setPopulated(true);
    }
  }, [setPopulated, initialValues])

  const onSubmit = (values) => {
    if (populated) {
      const updates = {
        ...initialValues,
        ...values,
      };
      updateRoutine(initialValues._id, updates)
      navigate("/")
    } else {
      createRoutine(values);
      // navigate(`/routines/add/session-plan/${id}`)
    }
    methods.reset(defaultValues);
  };//onsubmit

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>

        <div className="form__group">
          <label className="form__label">Routine name: </label>
          <input
            className="form__input"
            type="text"
            name="name"
            {...methods.register("name")}
          />
        </div>

        <div className="form__group form__group--options">
          <label className="form__label">
            Units of resistance:
            <select
              className="form__input"
              name="units"
              {...methods.register("units")}
            >
              <option value="kg">Kg</option>
              <option value="lbs">Lbs</option>
            </select>
          </label>
        </div>

        <SessionPlanFormArray />
        
        <section className="form__button-area">
          <button
            className="button form__btn--submit"
            type="submit"
          >
            Save Routine
          </button>
        </section>

        <pre>
          {JSON.stringify(methods.watch(), null, 2)}
        </pre>

      </form>
    </FormProvider>
  )
}