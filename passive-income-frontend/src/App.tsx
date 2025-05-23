import { Outlet } from "react-router";

import MenuAppBar from "./components/AppBar";

function App() {
  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  );
}

export default App;
