// src/Routes/MainRoutes.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Email from "../problems/moonshotQ1/pages/Email";
import Dashboard from "../problems/moonshotQ2/Dashboard";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <Email /> }],
  },

  {
    path: "/",
    element: <App />,
    children: [{ path: "/data-visualization-dashboard", element: <Dashboard /> }],
  },
]);

const MainRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MainRoutes;
