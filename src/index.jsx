// REACT
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// ROUTING
import Root from "./routes/root";
import About from "./routes/about";
import Credit from "./routes/credit";
import Wander from "./routes/wander";
import Story from "./routes/story";
import Video from "./routes/video";
import ErrorPage from "./error-page";
// STYLING
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "./theme";
import "./css/index.css";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Wander />,
      },
      {
        path: "story/:name",
        element: <Story />,
      },
      {
        path: "video/:name",
        element: <Video />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "credit",
        element: <Credit />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={DefaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
