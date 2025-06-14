import { useForm } from "react-hook-form";

import type { Contact, Institution, Program, SchoolYear } from "../../../../../shared/types";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useFetch } from "../../../hooks/useFetch";
import { Box } from "@mui/material";
import { useProgramCoordinatorForm } from "../coordinator-form/useProgramCoordinatorForm";
import SchoolProgramParticipationForm from "./SchoolProgramParticipationForm";
import { FormValues } from "../types";
import { ProgramCoordinatorForm } from "../coordinator-form/ProgramCoordinatorForm";

export const SchoolProgramParticipationForms = () => {
  const { refetch, handleFormSubmit } = useProgramCoordinatorForm();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      institutionId: null,
      contactId: null,
      programId: null,
      schoolYearId: null,
    },
  });

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

  const {
    data: contactsData,
    loading: contactsLoading,
    error: contactsError,
  } = useFetch<Contact[]>("http://localhost:3000/api/contacts");

  return (
    <Box
      style={{
        display: isMdUp ? "flex" : "block",
        justifyContent: "center",
        flex: 1,
        gap: "16px",

        flexWrap: "wrap",
      }}
    >
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
        contactsData={contactsData}
        contactsLoading={contactsLoading}
        contactsError={contactsError}
        refetch={refetch}
      />
      <ProgramCoordinatorForm
        contacts={contactsData || []}
        institutions={institutionsData || []}
        programs={programsData || []}
        schoolYears={schoolYearsData || []}
        control={control}
        handleSubmit={handleSubmit}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};
