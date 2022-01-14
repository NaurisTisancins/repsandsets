import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export const ExercisesFormArray = ({ nestedIndex }) => {
  const { control, register, formState } = useFormContext();
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: `sessionPlan[${nestedIndex}].selectedExercises`
  });

  return (//TODO ----------------------------------------------------------------
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <input
              name={`test[${nestIndex}].nestedArray[${k}].field1`}
              ref={register({ required: true })}
              defaultValue={item.field1}
              style={{ marginRight: "25px" }}
            />

            <input
              name={`test[${nestIndex}].nestedArray[${k}].field2`}
              ref={register()}
              defaultValue={item.field2}
            />
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            exercise: "",
            repRange: {
              min: "",
              max: "",
            }
          })
        }
      >
        Append Nested
      </button>

      <hr />
    </div>
  );
  
}
