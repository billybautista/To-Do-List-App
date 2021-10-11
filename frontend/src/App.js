import React from "react";
import { Route } from "react-router";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      {!token ? (
        <Route path="/" component={Landing} exact />
      ) : (
        <Route path="/home" component={Home} />
      )}
    </div>
  );
}
export default App;
