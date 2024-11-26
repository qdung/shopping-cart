import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Cart, Inventory } from "./pages";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
