import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider, useNavigate, Navigate, useLocation } from "react-router";
import SchoolsPage from "./features/schools/School.tsx";
import { Contact } from "./features/contacts/Contact.tsx";
import IzrzForm from "./features/Izrz/RaportDocumentGenerator.tsx";
import { Tasks } from "./features/tasks/Task.tsx";
import { SchoolProgramParticipation } from "./features/school-program-participation/SchoolProgramParticipation.tsx";
import { AuthProvider } from "./auth/auth.provider.tsx";
import { useAuth } from "./auth/useAuth.ts";
import { LoginPage } from "./features/login/Login.tsx";
import { Home } from "./features/home/Home.tsx";

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

function RequireAuth({ children }: { children: React.ReactNode }) {
  let location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Jeśli użytkownik nie jest zalogowany, przekieruj na login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jeśli jest zalogowany, renderuj dzieci (chronioną zawartość)
  return children;
}

const router = createBrowserRouter([
  {
    // public routes
    path: "/",
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/schools",
        element: (
          <RequireAuth>
            <SchoolsPage />
          </RequireAuth>
        ),
      },
      {
        path: "/contacts",
        element: (
          <RequireAuth>
            <Contact />
          </RequireAuth>
        ),
      },
      {
        path: "/izrz",
        element: (
          <RequireAuth>
            <IzrzForm />
          </RequireAuth>
        ),
      },
      {
        path: "/zadania",
        element: (
          <RequireAuth>
            <Tasks />
          </RequireAuth>
        ),
      },
      {
        path: "/uczestnictwo-szkół-w-programach",
        element: (
          <RequireAuth>
            <SchoolProgramParticipation />
          </RequireAuth>
        ),
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
    <AuthProvider children={<RouterProvider router={router} />} />
  </StrictMode>
);
