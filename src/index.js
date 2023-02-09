import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";


import { GQGame } from "./pages/GQGame";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GQGame />
    </BrowserRouter>
  </React.StrictMode>
);