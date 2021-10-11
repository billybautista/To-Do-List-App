import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Landing() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div>
      {(isSignup && <Signup renderLogin={() => setIsSignup(false)} />) || (
        <Login renderSignup={() => setIsSignup(true)} />
      )}
    </div>
  );
}

export default Landing;
