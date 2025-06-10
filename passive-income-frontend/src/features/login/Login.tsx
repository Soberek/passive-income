import { Button, TextField } from "@mui/material";
import { useAuth } from "../../auth/useAuth";

export const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Tu możesz zrobić async login z API
    login();
  };

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
