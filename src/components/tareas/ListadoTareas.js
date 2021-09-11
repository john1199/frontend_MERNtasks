import React, { useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareasProyecto } = tareasContext;

  if (!proyecto) return <h2>Selecciona un nuevo proyecto</h2>;

  //Array destructuring
  const [proyectoActual] = proyecto;
  
  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareasProyecto.map((tarea) => <Tarea tarea={tarea} />)
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoActual.id)}
      >
        Eliminar Proyectos &times;
      </button>
    </>
  );
};

export default ListadoTareas;
