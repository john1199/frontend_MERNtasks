import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_FORM_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaActual: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareas = async (proyectoId) => {
    try {
      const res = await clienteAxios.get("api/tareas", {
        params: { proyectoId },
      });
      dispatch({ type: TAREAS_PROYECTO, payload: res.data.listTareas });
      console.log(res.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };

  const agregarTarea = async (tarea) => {
    try {
      const res = await clienteAxios.post("api/tareas", tarea);
      console.log(res.data.msg);
      dispatch({ type: AGREGAR_TAREA, payload: res.data.tarea });
    } catch (error) {
      console.log(error.response);
    }
  };

  const mostrarError = () => {
    dispatch({ type: VALIDAR_FORM_TAREA });
  };

  const eliminarTarea = async (id, proyectoId) => {
    try {
      const res = await clienteAxios.delete(`api/tareas/${id}`, {
        params: { proyectoId },
      });
      console.log(res.data.msg);
      dispatch({ type: ELIMINAR_TAREA, payload: id });
    } catch (error) {
      console.log(error.response);
    }
  };
  const obtenerTareaActual = (tarea) => {
    dispatch({ type: TAREA_ACTUAL, payload: tarea });
  };
  const actualizarTarea = async (tarea) => {
    try {
      const res = await clienteAxios.put(`api/tareas/${tarea._id}`, tarea);
      console.log(res.data.msg);
      dispatch({ type: ACTUALIZAR_TAREA, payload: res.data.tarea });
    } catch (error) {
      console.log(error.response);
    }
  };
  const limpiarTarea = () => {
    dispatch({ type: LIMPIAR_TAREA });
  };
  return (
    <tareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaActual: state.tareaActual,
        obtenerTareas,
        agregarTarea,
        mostrarError,
        eliminarTarea,
        obtenerTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
