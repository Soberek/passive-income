import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import NavDrawer from "./Navbar";
import { useAuth } from "../auth/useAuth";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { login, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      login();
    } else {
      logout();
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100vw", bgcolor: "primary.main", py: 2 }}>
      <FormGroup sx={{ position: "fixed", top: "95%", left: 30, zIndex: 1201 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isAuthenticated}
              onChange={handleChange}
              aria-label="login switch"
              sx={{
                "& .MuiSwitch-thumb": {
                  bgcolor: isAuthenticated ? "#388e3c" : "#d32f2f",
                },
              }}
            />
          }
          label={isAuthenticated ? "Wyloguj" : "Zaloguj"}
          sx={{
            px: 2,
            borderRadius: 2,
            boxShadow: 1,
            fontWeight: 600,
            ".MuiFormControlLabel-label": {
              color: "#333",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            },
          }}
        />
      </FormGroup>

      <AppBar position="static">
        <Toolbar
          sx={{
            minHeight: 90, // większy navbar
            px: { xs: 1, sm: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              borderRadius: 2,

              fontSize: 34,
              "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
              height: 60,
              width: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.03em",
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.08)",
                mb: 0.2,
                textAlign: "center",
              }}
            >
              EduRaport
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#e3f2fd",
                fontStyle: "italic",
                mt: 0.2,
              }}
            >
              Twój system raportowania edukacyjnego
            </Typography>
          </Box>

          {isAuthenticated && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  ml: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.10)",
                  boxShadow: 5,
                  fontSize: 28,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.20)" },
                  height: 56,
                  width: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🎓
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  "& .MuiPaper-root": {
                    minWidth: 180,

                    color: "#1976d2",
                    boxShadow: "0 4px 16px 0 rgba(31,38,135,0.12)",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>Profil</MenuItem>
                <MenuItem onClick={handleClose}>Moje konto</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <NavDrawer isOpen={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
