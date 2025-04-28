import { Outlet } from "react-router";
import "./App.css";
import { NavLink } from "react-router";

const routes = [
  {
    name: "Szkoły",
    path: "schools",
  },
  {
    name: "Kontakty",
    path: "contacts",
  },
];
function App() {
  return (
    <>
      <nav style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", gap: "10px" }}>
          {routes.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                style={({ isActive }) => ({
                  padding: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  color: isActive ? "blue" : "black",
                })}
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
