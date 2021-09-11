import React, { useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;
  if (!proyecto) return <h2>Selecciona un nuevo proyecto</h2>;
  //Array destructuring
  const [proyectoActual] = proyecto;
  const tareas = [
    { nombre: "Plataforma", estado: true },
    { nombre: "Colores", estado: false },
    { nombre: "Pago", estado: true },
    { nombre: "Hosting", estado: false },
  ];
  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareas.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareas.map((tarea) => <Tarea tarea={tarea} />)
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
