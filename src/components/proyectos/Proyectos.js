import { React, useContext, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/auth/authContext";

const Proyectos = () => {
  const authContext = useContext(AuthContext);
  const { usuario, obtenerAutenticado, cerrarSesion } = authContext;
  
  useEffect(() => {
    obtenerAutenticado();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Header usuario={usuario} cerrarSesion={cerrarSesion}/>
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
