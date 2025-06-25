import { Box } from "@mui/material";
import SitesContainer from "../../components/SiteContainer";
import SiteTitle from "../../components/SiteTitle";
import { AddMediaForm } from "./AddMediaForm";
import { AddTaskForm } from "./AddTaskForm";

export const Tasks = () => {
  return (
    <SitesContainer>
      <SiteTitle>✅ Dodaj zadanie</SiteTitle>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
        <AddTaskForm />
        <AddMediaForm />
      </Box>
    </SitesContainer>
  );
};
{
  /* how to make select */
}
