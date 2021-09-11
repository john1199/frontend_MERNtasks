import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
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
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  return (
    <tareaContext.Provider value={{ tareas: state.tareas }}>
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
