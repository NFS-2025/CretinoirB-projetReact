import React from "react";
import { Route, Routes } from "react-router-dom";

import TicTacToe from "../page/tiktakto";
import ConnectFour from "./ConnectFour";

const Routing = () => {
  return (
    <Routes>
      <Route path="/connectfour" element={<ConnectFour />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
    </Routes>
  );
};

export default Routing;
