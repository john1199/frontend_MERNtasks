import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import { TAREAS_PROYECTO } from "../../types";

const tareas = [
  { nombre: "Plataforma", estado: true, proyectoId: 4 },
  { nombre: "Colores", estado: false, proyectoId: 4 },
  { nombre: "Pago", estado: true, proyectoId: 3 },
  { nombre: "Hosting", estado: false, proyectoId: 2 },
  { nombre: "Colores", estado: false, proyectoId: 3 },
  { nombre: "Pago", estado: true, proyectoId: 2 },
  { nombre: "Pago", estado: true, proyectoId: 1 },
  { nombre: "Hosting", estado: false, proyectoId: 2 },
  { nombre: "Plataforma", estado: true, proyectoId: 1 },
];
const TareaState = (props) => {
  const initialState = {
    tareas: tareas,
    tareasProyecto: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareas = (proyectoId) => {
    dispatch({ type: TAREAS_PROYECTO, payload: proyectoId });
  };
  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        obtenerTareas,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
