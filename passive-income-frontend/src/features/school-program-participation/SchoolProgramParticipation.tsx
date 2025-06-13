import { Box, Typography } from "@mui/material";
import SchoolProgramParticipationForm from "./SchoolProgramParticipationForm";
import { SchoolProgramParticipationTable } from "./SchoolProgramParticipationTable";

import { useFetch } from "../../hooks/useFetch";

import { Institution, Program, School, SchoolYear } from "../../../../shared/types";

export interface SchoolProgramParticipationTableI extends Institution, Program, SchoolYear, School {
  participationId: number;
  programId: number;
  institutionName: string;
  schoolId: number;
}

export const SchoolProgramParticipation = () => {
  const { data, loading, refetch } = useFetch<SchoolProgramParticipationTableI[]>(
    "http://localhost:3000/api/school-program-participation"
  );

  const {
    data: institutionsData,
    loading: institutionsLoading,
    error: institutionsError,
  } = useFetch<Institution[]>("http://localhost:3000/api/institutions");

  const {
    data: programsData,
    loading: programsLoading,
    error: programsError,
  } = useFetch<Program[]>("http://localhost:3000/api/programs");

  const {
    data: schoolYearsData,
    loading: schoolYearsLoading,
    error: schoolYearsError,
  } = useFetch<SchoolYear[]>("http://localhost:3000/api/school-years");

  return (
    <Box sx={{ marginY: 2, marginX: 2 }}>
      <Typography variant="h5" gutterBottom>
        🎓 Dodaj uczestnictwo szkoły w programie 📚
      </Typography>
      <SchoolProgramParticipationForm
        institutionsData={institutionsData}
        institutionsLoading={institutionsLoading}
        institutionsError={institutionsError}
        programsData={programsData}
        programsLoading={programsLoading}
        programsError={programsError}
        schoolYearsData={schoolYearsData}
        schoolYearsLoading={schoolYearsLoading}
        schoolYearsError={schoolYearsError}
        refetch={refetch}
      />
      {data && data.length > 0 && <SchoolProgramParticipationTable data={data} loading={loading} />}
    </Box>
  );
};
