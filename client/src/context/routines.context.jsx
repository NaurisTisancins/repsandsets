import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

let headers = {
  "content-Type": "application/json",
};

export const RoutinesContext = createContext({
  fetchRoutines: () => { },
  createRoutine: () => { },
  removeRoutine: () => { },
  loaded: false,
  loading: false,
  error: null,
  routines: [],
});

export const RoutinesProvider = (props) => {
  //token stuff

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    routines: [],
  });//State

  const { loading, error, routines, loaded } = state;

  const setLoading = useCallback(
    () =>
      setState({
        ...state,
        loading: true,
      }),
    [state]
  );//setLoading

  const setRoutines = useCallback(
    (data) => {
      setState({
        ...state,
        routines: data,
        loading: false,
        loaded: true,
      });
    }
  );//setRoutines

  const setError = useCallback(
    (err) =>
      setState({
        ...state,
        error: err.message || err.statusText,
        loading: false,
        loaded: true,
      }),
    [state]
  );//setError

  const { addToast } = useToasts();

  //get token useEffect

  const fetchRoutines = useCallback(async () => {
    if (loading || loaded || error) return;

    setLoading();

    try {
      const response = await fetch("/api/v1/routines", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) throw response;
      const data = await response.json();
      console.log("context fetch routines",data)
      setRoutines(data);
    } catch (e) {
      console.log("fetchroutines, routines.context error", e);
      setError(e);
    }
  });//fetchRoutines

  const createRoutine = useCallback(async (formData) => {
    setLoading();
    const { routines } = state;
    try {
      const response = await fetch("/api/v1/routines", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedRoutine = await response.json();
      console.log("got data", savedRoutine);
      setRoutines([...routines, savedRoutine]);
      addToast(`Saved ${savedRoutine.routineName}`, {
        appearance: "success",
      });
    } catch (e) {
      console.log(e);
      setState(e);
      addToast(`Error ${e.message || e.statusText}`, {
        appearance: "error",
      });
    }
  });//createRoutine

  const removeRoutine = useCallback(async (id) => {
    let deletedRoutine = null;
    setLoading();
    const { routines } = state;
    try {
      const response = await fetch(`api/v1/routines/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      if (response.status !== 204) throw response;
      const index = routines.findIndex(routine => routine._id === id);
      deletedRoutine = routines[index];
      const updatedRoutines = [
        ...routines.slice(0, index),
        ...routines.slice(index + 1),
      ];
      setRoutines(updatedRoutines);
      addToast(`Deleted ${deletedRoutine.routineName}`, {
        appearance: "success",
      });
    } catch (e) {
      console.log(e);
      setError(e);
      addToast(`Error: Failed to update ${deletedRoutine.routineName}`, {
        appearance: "error",
      });
    }
  })


  return (
    <RoutinesContext.Provider
      value={{
        routines,
        loading,
        loaded,
        error,
        fetchRoutines,
        createRoutine,
        removeRoutine,
      }}
    >
      {props.children}
    </RoutinesContext.Provider>
  )
};//RoutineProvider