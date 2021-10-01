import React, { useReducer } from "react";
import authReducer from "./authReducer";
import authContext from "./authContext";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/index";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    usuario: null,
    msg: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (user) => {
    try {
      const res = await clienteAxios.post("/api/users", user);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: res.data.token,
      });
      obtenerAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //token por headers
      tokenAuth(token);
    }
    try {
      const res = await clienteAxios.get("api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: res.data.user,
      });
    } catch (error) {
      const alerta = {
        msg: error.response,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const iniciarSesion = async (user) => {
    try {
      const res = await clienteAxios.post("api/auth", user);
      console.log(res);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: res.data.token,
      });
      obtenerAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        msg: state.msg,
        loading: state.loading,
        registrarUsuario,
        obtenerAutenticado,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
