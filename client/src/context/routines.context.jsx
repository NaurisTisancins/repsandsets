import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

let headers = {
  "content-Type": "application/json",
};

export const RoutinesContext = createContext({
  fetchRoutines: () => { },
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
      setRoutines(data);
    } catch (e) {
      console.log("fetchroutines, routines.context error", e);
      setError(e);
    }
  });//fetchRoutines

  return (
    <RoutinesContext.Provider
      value={{
        routines,
        loading,
        loaded,
        error,
        fetchRoutines,
      }}
    >
      {props.children}
    </RoutinesContext.Provider>
  )
};//RoutineProvider