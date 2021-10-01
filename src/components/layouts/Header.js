import React from "react";

const Header = ({ usuario, cerrarSesion }) => {
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : (
        <p className="nombre-usuario">Hola</p>
      )}
      <nav className="nav-principal">
        <button className="btn btn-blank cerrar-sesion" onClick={()=> cerrarSesion()}>Cerrar Sesion</button>
      </nav>
    </header>
  );
};

export default Header;
