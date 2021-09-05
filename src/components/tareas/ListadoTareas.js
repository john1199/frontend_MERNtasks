import React from "react";
import Tarea from "./Tarea";

const ListadoTareas = () => {
  const tareas = [
    { nombre: "Plataforma", estado: true },
    { nombre: "Colores", estado: false },
    { nombre: "Pago", estado: true },
    { nombre: "Hosting", estado: false },
  ];
  return (
    <>
      <h2>Proyecto: Tienda</h2>
      <ul className="listado-tareas">
        {tareas.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareas.map((tarea) => <Tarea tarea={tarea} />)
        )}
      </ul>
      <button type="button" className="btn btn-eliminar">
        Eliminar Proyectos &times;
      </button>
    </>
  );
};

export default ListadoTareas;
