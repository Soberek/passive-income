import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router";
import { useAuth } from "../auth/useAuth";

const public_routes = [
  {
    icon: "🏠",
    name: "Strona główna",
    path: "/",
  },
  {
    icon: "📋",
    name: "Zaloguj się",
    path: "/login",
  },
  {
    icon: "📝",
    name: "Zarejestruj się",
    path: "/register",
  },
];

const private_routes = [
  {
    icon: "🏠",
    name: "Strona główna",
    path: "/",
  },
  {
    icon: "🏫",
    name: "Dodaj szkołę",
    path: "/schools",
  },
  {
    icon: "📞",
    name: "Dodaj kontakt",
    path: "/contacts",
  },
  {
    icon: "📊",
    name: "Wygeneruj izrz offline",
    path: "/izrz",
  },
  {
    icon: "🦷",
    name: "Dodaj szkołę do programu",
    path: "/uczestnictwo-szkół-w-programach",
  },
  {
    icon: "👩🏻‍🏫",
    name: "Dodaj koordynatora programu",
    path: "/program-coordinators",
  },
  {
    icon: "📅",
    name: "Dodaj typy szkoły",
    path: "/school-types",
  },
  {
    icon: "✅",
    name: "Dodaj wykonane zadanie",
    path: "/zadania",
  },
];

export default function NavDrawer({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}) {
  const { isAuthenticated } = useAuth();
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {isAuthenticated
          ? private_routes.map((route) => (
              <ListItem key={route.path} disablePadding>
                <ListItemButton component={NavLink} to={route.path}>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItemButton>
              </ListItem>
            ))
          : public_routes.map((route) => (
              <ListItem key={route.path} disablePadding>
                <ListItemButton component={NavLink} to={route.path}>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div style={{ display: "flex", marginBottom: "20px", marginTop: "20px" }}>
      {/* <Button onClick={toggleDrawer(true)} variant="contained">
        Otwórz menu
      </Button> */}
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
