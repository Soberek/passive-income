import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";
import { useAuth } from "../auth/useAuth";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DescriptionIcon from "@mui/icons-material/Description";
import SchoolIcon from "@mui/icons-material/School";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import TableChartIcon from "@mui/icons-material/TableChart";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const public_routes = [
  {
    icon: <HomeIcon color="primary" />,
    name: "Strona główna",
    path: "/",
  },
  {
    icon: <LoginIcon color="action" />,
    name: "Zaloguj się",
    path: "/login",
  },
  {
    icon: <AppRegistrationIcon color="action" />,
    name: "Zarejestruj się",
    path: "/register",
  },
];

const private_routes = [
  {
    icon: <HomeIcon color="primary" />,
    name: "Strona główna",
    path: "/",
  },
  {
    icon: <DescriptionIcon color="secondary" />,
    name: "Wygeneruj miernik budżetowy",
    path: "/excel-raport-generator",
  },
  {
    icon: <SchoolIcon color="info" />,
    name: "Dodaj szkołę",
    path: "/schools",
  },
  {
    icon: <ContactPhoneIcon color="success" />,
    name: "Dodaj kontakt",
    path: "/contacts",
  },
  {
    icon: <TableChartIcon color="warning" />,
    name: "Wygeneruj dokument izrz",
    path: "/izrz",
  },
  {
    icon: <AddTaskIcon color="error" />,
    name: "Dodaj szkołę do programu",
    path: "/uczestnictwo-szkół-w-programach",
  },
  {
    icon: <EventNoteIcon color="secondary" />,
    name: "Dodaj typy szkoły",
    path: "/school-types",
  },
  {
    icon: <CheckCircleIcon color="success" />,
    name: "Dodaj wykonane zadanie",
    path: "/zadania",
  },
];

const getActiveStyle = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? {
        // light orange in hex
        // rgb(219, 121, 101)
        backgroundColor: "#ffccbc",
        color: "black",
        fontWeight: 600,
        borderRadius: "8px",
      }
    : {};

export default function NavDrawer({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}) {
  const { isAuthenticated } = useAuth();

  return (
    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 300,
          padding: 2,
          bgcolor: "background.paper",
          height: "100%",
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            textAlign: "center",
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Menu nawigacji
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {(isAuthenticated ? private_routes : public_routes).map((route) => (
            <ListItem key={route.path} disablePadding>
              <NavLink
                to={route.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  display: "flex",
                  width: "100%",
                  ...getActiveStyle({ isActive }),
                })}
              >
                <ListItemButton
                  sx={{
                    my: 0.5,
                    mx: 0.5,
                    borderRadius: 2,
                    flexGrow: 1,
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "#bbdefb",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{route.icon}</ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "1.05rem",
                    }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mt: 2 }} />
        <Box mt={2} sx={{ textAlign: "center", color: "text.primary", fontSize: "0.9rem" }}>
          &copy; {new Date().getFullYear()} Soberek
        </Box>
      </Box>
    </Drawer>
  );
}
