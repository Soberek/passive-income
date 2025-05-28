import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import SchoolsPage from "./features/schools/School.tsx";
import { Contact } from "./features/contacts/Contact.tsx";
import IzrzForm from "./features/Izrz/Izrz.tsx";
import { Tasks } from "./features/tasks/Task.tsx";
import { SchoolProgramParticipation } from "./features/school-program-participation/SchoolProgramParticipation.tsx";

const ErrorElement = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("..")}>Go back</button>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    // layout
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/schools",
        element: <SchoolsPage />,
      },
      {
        path: "/contacts",
        element: <Contact />,
      },
      {
        path: "/izrz",
        element: <IzrzForm />,
      },
      {
        path: "/zadania",
        element: <Tasks />,
      },
      {
        path: "/uczestnictwo-szkół-w-programach",
        element: <SchoolProgramParticipation />,
      },
    ],
  },
  // error
  {
    path: "*",
    element: <ErrorElement />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
