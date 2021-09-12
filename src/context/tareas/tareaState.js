import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_FORM_TAREA,
  ELIMINAR_TAREA,
} from "../../types";

const tareas = [
  { id: 1, nombre: "Plataforma", estado: true, proyectoId: 4 },
  { id: 2, nombre: "Colores", estado: false, proyectoId: 4 },
  { id: 3, nombre: "Pago", estado: true, proyectoId: 3 },
  { id: 4, nombre: "Hosting", estado: false, proyectoId: 2 },
  { id: 5, nombre: "Colores", estado: false, proyectoId: 3 },
  { id: 6, nombre: "Pago", estado: true, proyectoId: 2 },
  { id: 7, nombre: "Pago", estado: true, proyectoId: 1 },
  { id: 8, nombre: "Hosting", estado: false, proyectoId: 2 },
  { id: 9, nombre: "Plataforma", estado: true, proyectoId: 1 },
];
const TareaState = (props) => {
  const initialState = {
    tareas: tareas,
    tareasProyecto: null,
    errorTarea: false,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareas = (proyectoId) => {
    dispatch({ type: TAREAS_PROYECTO, payload: proyectoId });
  };

  const agregarTarea = (tarea) => {
    dispatch({ type: AGREGAR_TAREA, payload: tarea });
  };

  const mostrarError = () => {
    dispatch({ type: VALIDAR_FORM_TAREA });
  };

  const eliminarTarea = (id) => {
    dispatch({ type: ELIMINAR_TAREA, payload: id });
  };
  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        obtenerTareas,
        agregarTarea,
        mostrarError,
        eliminarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
