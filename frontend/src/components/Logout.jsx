import React from "react";

/**
 * Este componente el token generado al registrarse
 */

function Logout() {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return <div onClick={() => logOut()}>Logout</div>;
}

export default Logout;
