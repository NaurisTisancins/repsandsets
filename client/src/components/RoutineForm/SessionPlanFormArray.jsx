import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import "./../../styles/form.styles.scss";
import { ExercisesFormArray } from ".";

export const SessionPlanFormArray = () => {
  const { control, register, getValues, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessionPlan"
  });

  return (
    <>
      <div className="form form__field-array form__field-array--session">
        <h2 className="form__subtitle">Your Session plan: </h2>
        {fields.map((item, index) => {
          return (

            <div className="form__group" key={item.id}>
              <label className="form__label">Session name:
                <input
                  className="form__input"
                  name={`sessionPlan[${index}].name`}
                  {...register(`sessionPlan[${index}].name`)}
                  type="text" />
              </label>
              <label
                className="form__label"
              >Session Focus:
                <select
                  className="form__input form__input--select"
                  name={`sessionPlan[${index}].sessionFocus`}
                  {...register(`sessionPlan[${index}].sessionFocus`)}
                >
                  <option value="Intenstiy">Intensity</option>
                  <option value="Volume">Volume</option>
                  <option value="Endurance">Endurance</option>
                </select>
              </label>
              <ExercisesFormArray nestedIndex={index} />
              <button
                className="button form__btn--delete"
                type="button" onClick={() => remove(index)}>
                Delete Session: {`${getValues(`sessionPlan[${index}].name`)}`}
              </button>
            </div>
          );
        })}
      </div>

      <section className="form__button-area">
        <button
          type="button"
          onClick={() => {
            append({
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
            });
          }}
        >
          Add Session
        </button>
      </section>
    </>
  )
}
