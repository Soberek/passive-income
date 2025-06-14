import type { Contact, Institution, Program, SchoolYear } from "../../../../../shared/types";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import SchoolProgramParticipationForm from "../school-participation-form/SchoolProgramParticipationForm";
import { ProgramCoordinatorForm } from "../coordinator-form/ProgramCoordinatorForm";

interface SchoolProgramParticipationFormsProps {
  institutionsData: Institution[] | null;
  institutionsLoading: boolean;
  institutionsError: Error | null;
  programsData: Program[] | null;
  programsLoading: boolean;
  programsError: Error | null;
  schoolYearsData: SchoolYear[] | null;
  schoolYearsLoading: boolean;
  schoolYearsError: Error | null;
  contactsData: Contact[] | null;
  contactsLoading: boolean;
  contactsError: Error | null;
  refetch: () => void;
}

export const SchoolProgramParticipationForms = ({
  institutionsData,
  institutionsLoading,
  institutionsError,
  programsData,
  programsLoading,
  programsError,
  schoolYearsData,
  schoolYearsLoading,
  schoolYearsError,
  contactsData,
  contactsLoading,
  contactsError,
  refetch,
}: SchoolProgramParticipationFormsProps) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

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
      />
    </Box>
  );
};
