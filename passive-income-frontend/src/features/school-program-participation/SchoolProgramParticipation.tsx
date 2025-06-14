import { Box, Typography } from "@mui/material";

import { Contact, Institution, Program, SchoolYear } from "../../../../shared/types";
import { useFetch } from "../../hooks/useFetch";
import { SchoolProgramParticipationForms } from "./school-program-participation-forms/SchoolProgramParticipationForms";
import { SchoolProgramCoordinatorFilters } from "./school-program-participation-table/SchoolProgramCoordinatorFilterButtons";

import { useSchoolProgramParticipationFilterButtons } from "./school-program-participation-table/useSchoolProgramCoordinatorFilterButtons";

import { SchoolProgramParticipationTable } from "./school-program-participation-table/SchoolProgramParticipationTable";
import { SchoolProgramParticipationTableI } from "./types";

export const SchoolProgramParticipation = () => {
  const {
    data: participationData,
    loading,
    error,
    refetch,
  } = useFetch<SchoolProgramParticipationTableI[]>("http://localhost:3000/api/school-program-participation");

  const {
    institutionIdParam,
    contactIdParam,
    programIdParam,
    schoolYearIdParam,
    handleParamsChange,
    filteredProgramCoordinatorsData,
  } = useSchoolProgramParticipationFilterButtons({ participationData: participationData || [] });

  const { data: institutions } = useFetch<Institution[]>("http://localhost:3000/api/institutions");
  const { data: programs } = useFetch<Program[]>("http://localhost:3000/api/programs");
  const { data: schoolYears } = useFetch<SchoolYear[]>("http://localhost:3000/api/school-years");
  const { data: contacts } = useFetch<Contact[]>("http://localhost:3000/api/contacts");

  return (
    <Box sx={{ marginY: 2, marginX: 2 }}>
      <Typography variant="h5" gutterBottom>
        🎓 Dodaj uczestnictwo szkoły w programie 📚
      </Typography>

      <SchoolProgramParticipationForms
        institutionsData={institutions}
        institutionsLoading={!institutions}
        institutionsError={null}
        programsData={programs}
        programsLoading={!programs}
        programsError={null}
        schoolYearsData={schoolYears}
        schoolYearsLoading={!schoolYears}
        schoolYearsError={null}
        contactsData={contacts}
        contactsLoading={!contacts}
        contactsError={null}
        refetch={refetch}
      />

      <SchoolProgramCoordinatorFilters
        handleParamsChange={handleParamsChange}
        institutionIdParam={institutionIdParam}
        contactIdParam={contactIdParam}
        programIdParam={programIdParam}
        schoolYearIdParam={schoolYearIdParam}
        institutions={institutions || []}
        programs={programs || []}
        schoolYears={schoolYears || []}
        contacts={contacts || []}
      />

      {loading && <Typography>Ładowanie danych...</Typography>}
      {error && <Typography color="error">Błąd ładowania danych: {error.message}</Typography>}

      {!loading && (!participationData || participationData.length === 0) && (
        <Typography>Brak danych o uczestnictwie szkół w programach.</Typography>
      )}
      {participationData && participationData.length > 0 && (
        <SchoolProgramParticipationTable data={filteredProgramCoordinatorsData} />
      )}
    </Box>
  );
};
