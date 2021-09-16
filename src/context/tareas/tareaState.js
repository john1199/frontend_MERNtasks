import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import { v4 as uuid } from "uuid";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_FORM_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
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
    tareaActual: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareas = (proyectoId) => {
    dispatch({ type: TAREAS_PROYECTO, payload: proyectoId });
  };

  const agregarTarea = (tarea) => {
    tarea.id = uuid();
    dispatch({ type: AGREGAR_TAREA, payload: tarea });
  };

  const mostrarError = () => {
    dispatch({ type: VALIDAR_FORM_TAREA });
  };

  const eliminarTarea = (id) => {
    dispatch({ type: ELIMINAR_TAREA, payload: id });
  };
  const estadoTarea = (tarea) => {
    dispatch({ type: ESTADO_TAREA, payload: tarea });
  };
  const obtenerTareaActual = (tarea) => {
    dispatch({ type: TAREA_ACTUAL, payload: tarea });
  };
  const actualizarTarea = (tarea) => {
    dispatch({ type: ACTUALIZAR_TAREA, payload: tarea });
  };
  const limpiarTarea = () => {
    dispatch({ type: LIMPIAR_TAREA });
  };
  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaActual: state.tareaActual,
        obtenerTareas,
        agregarTarea,
        mostrarError,
        eliminarTarea,
        estadoTarea,
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
