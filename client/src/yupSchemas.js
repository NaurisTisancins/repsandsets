import * as yup from 'yup';


export const SessionPlanSchema = yup.object().shape({
  name: yup.string(),
  sessionFocus: yup.mixed().oneOf(["Intensity", "Volume", "Endurance"]),
  selectedExercises: yup.array()
    .of(
      yup.object().shape({
        exercise: yup.string().required(),
        repRange: yup.object().shape({
          min: yup.number(),
          max: yup.number(),
        })
      })
    )
})

export const RoutineSchema = yup.object().shape({
  name: yup.string().required(),
  units: yup.mixed().oneOf(["kg", "lbs"]),
  sessionPlan: yup.array(SessionPlanSchema)
});