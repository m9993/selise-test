import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/report", element: <Report/> },
]);
