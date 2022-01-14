import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import "./../../styles/form.styles.scss";

export const ExercisesFormArray = ({ nestedIndex }) => {
  const { control, register, formState } = useFormContext();
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: `sessionPlan[${nestedIndex}].selectedExercises`
  });

  return (
    <>
      <div className="form form__field-array form__field-array--exercises">
        <h2 className="form__subtitle">Select your exercises: </h2>
        {fields.map((item, index) => {
          return (
            <div className="form__group" key={item.id}>
              <label className="form__label">Exercise: </label>
              <input
                className="form__input"
                name={
                  `sessionPlan[${nestedIndex}].selectedExercises[${index}].exercise`}
                {...register(
                  `sessionPlan[${nestedIndex}].selectedExercises[${index}].exercise`)}
              />

              <label className="form__label">Rep Range: </label>
              <div className="form__ group form__group--min-max">

                <label className="form__label form__label--min-max">Min:
                  <input
                    className="form__input form__input--min-max"
                    name={
                      `sessionPlan[${nestedIndex}].selectedExercises[${index}].repRange.min`}
                    {...register(
                      `sessionPlan[${nestedIndex}].selectedExercises[${index}].repRange.min`)}
                  />
                </label>

                <label className="form__label form__label--min-max">Max:
                  <input
                    className="form__input form__input--min-max"
                    name={
                      `sessionPlan[${nestedIndex}].selectedExercises[${index}].repRange.max`}
                    {...register(
                      `sessionPlan[${nestedIndex}].selectedExercises[${index}].repRange.max`)}
                  />
                </label>

                <button
                  className="button form__btn--delete"
                  type="button" onClick={() => remove(index)}>
                  Delete Exercise
                </button>
              </div>
            </div>
          );
        })}
        <section className="form__button-area">
          <button
            type="button"
            onClick={() =>
              append({
                exercise: "",
                repRange: { min: "", max: "", }
              })
            }>
            Add Exercise</button>
        </section>
      </div>
    </>
  );

}
