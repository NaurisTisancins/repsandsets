import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import "./../../styles/form.styles.scss";
import { ExercisesFormArray } from ".";

export const SessionPlanFormArray = () => {
  const { control, register, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessionPlan"
  });

  return (
    <>
      <div className="form form__field-array">
        <h2>Your Session plan: </h2>
        {fields.map((item, index) => {
          return (
            <div className="form__group" key={item.id}>
              <label
                className="form__label"
              >Session Focus:
                <select
                  className="form__input"
                  name={`sessionPlan[${index}].sessionFocus`}
                  {...register(`sessionPlan[${index}].sessionFocus`)}
                >
                  <option value="Intenstiy">Intensity</option>
                  <option value="Volume">Volume</option>
                  <option value="Endurance">Endurance</option>
                </select>
              </label>
              <ExercisesFormArray nestedIndex={index} />
              <button type="button" onClick={() => remove(index)}>
                Delete Session
              </button>
            </div>
          );
        })}
      </div>

      <section>
        <button
          type="button"
          onClick={() => {
            append({
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
