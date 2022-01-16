import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Index } from "./pages";
import { About } from "./pages/about";
import { UserContext } from "./UserContext";

function App() {
  const [sign, setsign] = useState([false,0," "]);
  [sn,id,role]=sign;
  return (
    <UserContext.Provider value={[sign, setsign]}>
    <Router>
       <Route exact path="/home" component={Home} />
        {sign ? (
          <Route exact path="/restricted" component={RestrictedPage} />
        ) : (
          <Redirect to="/login" />
        )}
        {role == "patient" ? (
          <Route exact path="/only-teacher" component={OnlyTeacher} />
        ) : (
          <Redirect to="/index" />
        )}
        {role == "doctor" ? (
          <Route exact path="/only-student" component={OnlyStudent} />
        ) : (
          <Redirect to="/index" />
        )}
        <Route exact path="/login" component={Login} />    
    </Router>
    </UserContext.Provider>
  );
}

export default App;