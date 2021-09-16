import React, { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    tareaActual,
    obtenerTareas,
    agregarTarea,
    mostrarError,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  //detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaActual !== null) {
      setTarea(tareaActual);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaActual]);
  const [tarea, setTarea] = useState({
    nombre: "",
  });

  const { nombre } = tarea;
  if (!proyecto) return null;
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      mostrarError();
      return;
    }
    if (tareaActual === null) {
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      limpiarTarea();
    }

    obtenerTareas(proyectoActual.id);
    setTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block btn-submit"
            value={tareaActual ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
