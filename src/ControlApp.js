import React from "react";

import { Route, Routes, Outlet } from "react-router-dom";

import { Home } from "./pages/Home";
import { NavBar } from "./pages/NavBar";
import { GQGame } from "./pages/GQGame";

import "./index.css";

const AppLayout = () => (
  <>
    <NavBar />

    <Outlet />
  </>
);

export function ControlApp() {
  return (
    <>
      <Routes>
        {/* // starting  with back to home*/}
        <Route path="/GQGame" element={<GQGame />} />
        {/* <Route path="/GQGame" element={<GQGame />} /> */}

        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default ControlApp;
