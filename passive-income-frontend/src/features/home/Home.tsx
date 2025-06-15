import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 6 },
            mb: 6,
            borderRadius: 4,
            color: "#fff",
            boxShadow: "0 4px 32px 0 rgba(31,38,135,0.09)",
          }}
        >
          <Box textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                textShadow: "0 2px 8px rgba(30,136,229,0.08)",
                letterSpacing: "0.03em",
                color: "primary.main",
              }}
            >
              EduRaport
            </Typography>
            <Typography variant="h5" sx={{ color: "black" }} paragraph>
              Twórz, analizuj i pobieraj raporty edukacyjne w nowoczesny sposób.
            </Typography>
            <Button
              onClick={() => navigate("/schools")}
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                mt: 2,
                mb: 4,
                px: 6,
                py: 1.5,
                fontWeight: 600,
                fontSize: 18,
                borderRadius: 3,
                boxShadow: 2,
                textTransform: "uppercase",
              }}
            >
              Rozpocznij
            </Button>
          </Box>
        </Paper>
        <Box display="flex" justifyContent="space-around" mt={4} flexWrap="wrap" gap={4}>
          <Paper
            elevation={2}
            sx={{
              maxWidth: 300,
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              background: "linear-gradient(135deg,#e3f2fd 60%,#bbdefb 100%)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              📊 Przejrzyste raporty
            </Typography>
            <Typography color="text.secondary">
              Generuj i analizuj raporty edukacyjne z czytelnymi wykresami i tabelami.
            </Typography>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              maxWidth: 300,
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              background: "linear-gradient(135deg,#e8f5e9 60%,#b2dfdb 100%)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              🔔 Powiadomienia
            </Typography>
            <Typography color="text.secondary">Bądź na bieżąco z najważniejszymi informacjami i terminami.</Typography>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              maxWidth: 300,
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              background: "linear-gradient(135deg,#fffde7 60%,#ffe082 100%)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              🔒 Bezpieczeństwo danych
            </Typography>
            <Typography color="text.secondary">
              Twoje dane są szyfrowane i chronione zgodnie z najwyższymi standardami.
            </Typography>
          </Paper>
        </Box>
      </Container>
      <Box bgcolor="grey.100" py={7} mt={8}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Dlaczego EduRaport?
          </Typography>
          <Typography align="center" color="text.secondary" paragraph>
            EduRaport automatyzuje przygotowanie dokumentów, ułatwia analizę wyników i pozwala skupić się na tym, co
            najważniejsze – rozwoju edukacji.
          </Typography>
        </Container>
      </Box>
    </>
  );
};
