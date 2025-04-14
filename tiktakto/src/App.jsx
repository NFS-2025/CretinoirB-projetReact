import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Importation de Router
import Routing from "./page/Routing";
import Navigation from "./page/navigationBar";

const App = () => {
  return (
    <Router>
      {" "}
     
      <div>
        <Navigation />
        <Routing />
      </div>
    </Router>
  );
};

export default App;
