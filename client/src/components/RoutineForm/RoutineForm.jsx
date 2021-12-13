import React, { useState, useContext, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import './styles.scss'

import { RoutinesContext } from '../../context';

const schema = yup.object().shape({
    routineName: yup.string().required(),
    movements: yup.array()
        .of(
            yup.object().shape({
                name: yup.string(),
            })
        )
});

export const RoutineForm = ({ initialValues }) => {
    const { createRoutine, updateRoutine } = useContext(RoutinesContext)
    const navigate = useNavigate();
    const [populated, setPopulated] = useState(false);

    let defaultValues = {
        routineName: "",
        movements: [],
    }

    // const { movements, sessions, routineName } = initialValues;

    const { register, handleSubmit, control, reset, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "movements",
    });
    const { isDirty, isValid } = formState;

    useEffect(() => {
        if (initialValues && !populated) {
            // initialValues.price = initialValues.price / 100;
            reset({
                ...initialValues,
            });
            fields.forEach(field => append({}));
            setPopulated(true);
        }

    }, [fields, setPopulated, initialValues])

    const onSubmit = (values) => {
        if (populated) {
            const updates = {
                ...initialValues,
                ...values,
            };
            updateRoutine(initialValues._id, updates)
        } else {
            createRoutine(values);
            console.log(values);
        }
        reset(defaultValues);
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