import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

let headers = {
  "content-Type": "application/json",
};

export const RoutinesContext = createContext({
  fetchRoutines: () => { },
  fetchRoutine: () => { },
  createRoutine: () => { },
  removeRoutine: () => { },
  updateRoutine: () => { },
  addSession: () => { },
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

  const { loading, error, routines, currentRoutine, loaded } = state;

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
      console.log("context fetch routines", data)
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
        headers: headers,
        body: JSON.stringify(formData)
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedRoutine = await response.json();
      console.log("got data", savedRoutine);
      setRoutines([...routines, savedRoutine]);
      addToast(`Saved ${savedRoutine.name}`, {
        appearance: "success",
      });
      return savedRoutine._id;
    } catch (e) {
      console.log(e);
      setError(e);
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
      const response = await fetch(`/api/v1/routines/${id}`, {
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
      addToast(`Deleted ${deletedRoutine.name}`, {
        appearance: "success",
      });
    } catch (e) {
      console.log(e);
      setError(e);
      addToast(`Error: Failed to DELETE ${deletedRoutine.name}`, {
        appearance: "error",
      });
    }
  });//removeroutine

  const updateRoutine = useCallback(async (id, updates) => {
    let newRoutine = null;
    setLoading();
    const { routines } = state;
    try {
      const response = await fetch(`/api/v1/routines/${id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(updates),
      });
      console.log("updateRoutine", response);
      if (!response.ok) {
        throw response;
      };
      //update the state
      const index = routines.findIndex((routine) => routine._id === id);
      const oldRoutine = routines[index];
      newRoutine = {
        ...oldRoutine,
        ...updates,
      };
      const updatedRoutines = [
        ...routines.slice(0, index),
        newRoutine,
        ...routines.slice(index + 1),
      ];
      setRoutines(updatedRoutines);
      addToast(`Updated ${newRoutine.name} routine`, {
        appearance: "success",
      })
    } catch (e) {
      console.log(e);
      setError(e);
      addToast(`Error failed to update  ${newRoutine.name}`, {
        appearance: "error",
      });
    }
  });//updateRoutine

  const addSession = useCallback(async (id, session) => {

  }); //addSession


  return (
    <RoutinesContext.Provider
      value={{
        routines,
        currentRoutine,
        loading,
        loaded,
        error,
        fetchRoutines,
        createRoutine,
        removeRoutine,
        updateRoutine,
        addSession,
      }}
    >
      {props.children}
    </RoutinesContext.Provider>
  )
};//RoutineProvider