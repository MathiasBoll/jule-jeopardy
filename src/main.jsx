// Importerer React (skal være der for at kunne bruge JSX)
import React from "react";

// Importerer ReactDOM til at rendere React-appen i browserens DOM
import ReactDOM from "react-dom/client";

// Importerer routing-funktioner fra React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Global CSS – styling der gælder for hele appen
import "./styles/global.css";

// Importerer hovedkomponenten for appen
import App from "./App.jsx";

/*
  Opretter routeren for applikationen.
  createBrowserRouter bruger browserens URL (history API).
*/
const router = createBrowserRouter([
  {
    // Alle routes (*) håndteres inde i App-komponenten
    path: "/*",

    // App er "root layout" for hele projektet
    element: <App />,
  },
]);

/*
  Finder HTML-elementet med id="root" i index.html
  og renderer hele React-applikationen ind i det
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode bruges i udvikling til at fange fejl og dårlige patterns
  <React.StrictMode>
    {/* 
      RouterProvider gør routeren tilgængelig i hele appen.
      Alle komponenter kan nu bruge routes, links og navigation.
    */}
    <RouterProvider
      router={router}

      /*
        future-flag:
        Aktiverer kommende React Router v7-features
        (bruges for bedre performance og fremtidssikring)
      */
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  </React.StrictMode>
);
