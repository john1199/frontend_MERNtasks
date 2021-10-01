import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { msg, proyectos, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    if (msg) {
      mostrarAlerta(msg.msg, msg.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line
  }, [msg]);

  if (proyectos.length === 0) return <h2>No hay proyectos, crea uno!</h2>;
  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {proyectos.map((proyecto) => (
        <Proyecto key={proyecto._id} proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
