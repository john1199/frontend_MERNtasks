import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../types";

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null,
    msg: null,
  };
  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    try {
      const res = await clienteAxios.get("api/proyectos");
      console.log(res.data.msg);
      dispatch({ type: OBTENER_PROYECTOS, payload: res.data.listProyectos });
    } catch (error) {
      console.log(error.response);
    }
  };

  const agregarProyecto = async (proyecto) => {
    try {
      const res = await clienteAxios.post("/api/proyectos", proyecto);
      console.log(res.data.msg);
      dispatch({ type: AGREGAR_PROYECTO, payload: res.data.proyecto });
    } catch (error) {
      console.log(error.response);
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  const proyectoActual = (id) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: id,
    });
  };

  const eliminarProyecto = async (id) => {
    try {
      const res = await clienteAxios.delete(`api/proyectos/${id}`);
      console.log(res.data.msg);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: id,
      });
    } catch (error) {
      console.log(error.response.data);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        msg: state.msg,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
