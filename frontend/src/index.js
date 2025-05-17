import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, AuthContext } from "./pages/Login/AuthContext"; // Import AuthProvider and AuthContext
import App from "./pages/Acceuil/App";
import Contact from "./pages/Contact/Contact";
import Robes from "./pages/Robes/Robes";
import Accessoires from "./pages/Accessoires/Accessoires";
import Erreur404 from "./pages/Erreur404/Erreur404";
import Login from "./pages/Login/Login";
import Univers from "./pages/Univers/Univers";
import Upload from "./components/Upload/Upload";
import Registration from "./pages/Login/registration";
import Admin from "./pages/Admin/Admin";
import AjoutRobe from "./pages/AjoutRobe/AjoutRobe";
import AjoutAccessoire from "./pages/AjoutAccessoire/AjoutAccessoire";
import ModificationRobe from "./pages/ModificationRobe/ModificationRobe";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ModificationAccessoire from "./pages/ModificationAccessoire/ModificationAccessoire";

// Define a PrivateRoute component that uses the AuthContext
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Define your router with the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/robes",
    element: <Robes />,
  },
  {
    path: "/accessoire",
    element: <Accessoires />,
  },
  {
    path: "*",
    element: <Erreur404 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        {" "}
        <Admin />{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/univers",
    element: <Univers />,
  },
  {
    path: "/inscription",
    element: <PrivateRoute> <Registration/> </PrivateRoute>,
  },
  {
    path: "/upload-robes",
    element: <PrivateRoute> <AjoutRobe/> </PrivateRoute>,
  },
  {
    path: "/upload-accessoires",
    element: <PrivateRoute> <AjoutAccessoire/> </PrivateRoute>,
  },
  {
    path: "/modification-robe/:id",
    element: <PrivateRoute><ModificationRobe/></PrivateRoute>,
  },
  {
    path: "/modification-accessoire/:id",
    element: <ModificationAccessoire />,
  },
]);

// Render the application wrapped with AuthProvider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
