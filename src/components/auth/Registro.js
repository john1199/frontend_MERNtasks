import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

const Registro = (props) => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { msg, autenticado, registrarUsuario } = authContext;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (msg) {
      mostrarAlerta(msg.msg, msg.categoria);
    }
  }, [msg, autenticado, props.history]);

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const { nombre, email, password, confirmar } = usuario;
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "error");
      return;
    }
    if (password.length < 6) {
      mostrarAlerta("La contraseña debe tener minimo 6 caracteres", "error");
      return;
    }
    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas no son iguales", "error");
      return;
    }
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite Tu Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Ya tienes cuenta? Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};

export default Registro;
