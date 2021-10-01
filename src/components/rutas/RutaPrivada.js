import { React, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  console.log(props);

  const authContext = useContext(AuthContext);
  const { autenticado, loading, obtenerAutenticado } = authContext;
  useEffect(() => {
    obtenerAutenticado();
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !loading ? <Redirect to={"/"} /> : <Component {...props} />
      }
    />
  );
};

export default RutaPrivada;
