import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas, eliminarTarea, estadoTarea, obtenerTareaActual } =
    tareasContext;

  const onClickEliminar = () => {
    eliminarTarea(tarea.id);
    obtenerTareas(proyecto[0].id);
  };
  const onClickEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    estadoTarea(tarea);
  };
  const onClickEditar = (tarea) => {
    obtenerTareaActual(tarea);
  };
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => onClickEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => onClickEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => onClickEditar(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={onClickEliminar}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
