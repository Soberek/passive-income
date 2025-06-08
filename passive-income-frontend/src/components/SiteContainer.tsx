import { Box } from "@mui/material";

const SitesContainer = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ p: 1, m: 2, backgroundColor: "white", borderRadius: "5px" }}>{children}</Box>;
};

export default SitesContainer;
