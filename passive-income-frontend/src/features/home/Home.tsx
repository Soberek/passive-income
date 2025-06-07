import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";

export const Home = () => {
  // using mui
  // Material UI homepage style

  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box textAlign="center">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Passive Income
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Track and grow your passive income streams with ease.
          </Typography>
          <Button onClick={() => navigate("/schools")} variant="contained" color="primary" size="large" sx={{ mb: 4 }}>
            Get Started
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-around" mt={6} flexWrap="wrap" gap={4}>
          <Box maxWidth={300} textAlign="center">
            <Typography variant="h6" gutterBottom>
              📈 Analytics Dashboard
            </Typography>
            <Typography color="text.secondary">
              Visualize your income sources and monitor growth with interactive charts.
            </Typography>
          </Box>
          <Box maxWidth={300} textAlign="center">
            <Typography variant="h6" gutterBottom>
              🔔 Income Alerts
            </Typography>
            <Typography color="text.secondary">
              Get notified when you receive new passive income or reach milestones.
            </Typography>
          </Box>
          <Box maxWidth={300} textAlign="center">
            <Typography variant="h6" gutterBottom>
              🔒 Secure & Private
            </Typography>
            <Typography color="text.secondary">
              Your financial data is encrypted and never shared with third parties.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box bgcolor="grey.100" py={6} mt={8}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Why Choose Us?
          </Typography>
          <Typography align="center" color="text.secondary" paragraph>
            Passive Income helps you stay on top of your finances, automate tracking, and focus on what matters
            most—growing your wealth.
          </Typography>
        </Container>
      </Box>
    </>
  );
};
