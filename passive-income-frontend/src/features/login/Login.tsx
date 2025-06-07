import { Button, TextField } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the login logic, e.g., call an API
    login();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleLogin}>
      <TextField label="Username" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
};
