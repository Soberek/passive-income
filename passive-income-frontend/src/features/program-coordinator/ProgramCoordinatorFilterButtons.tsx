import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import { Contact, Institution, Program, SchoolYear } from "../../../../shared/types";
import { FormValues } from "./ProgramCoordinator";

interface ProgramCoordinatorFiltersProps {
  institutions: Institution[];
  programs: Program[];
  schoolYears: SchoolYear[];
  contacts: Contact[];
  institutionIdParam: string | null;
  contactIdParam: string | null;
  programIdParam: string | null;
  schoolYearIdParam: string | null;
  handleParamsChange: (field: keyof FormValues, value: string | null) => void;
}

export const ProgramCoordinatorFilters: React.FC<ProgramCoordinatorFiltersProps> = ({
  institutions,
  programs,
  schoolYears,
  contacts,
  institutionIdParam,
  contactIdParam,
  programIdParam,
  schoolYearIdParam,
  handleParamsChange,
}) => {
  if (!institutions || institutions.length === 0) {
    console.error("No institutions available");
    return <div>Loading institutions...</div>;
  }

  if (!programs || programs.length === 0) {
    console.error("No programs available");
    return <div>Loading programs...</div>;
  }

  if (!schoolYears || schoolYears.length === 0) {
    console.error("No school years available");
    return <div>Loading school years...</div>;
  }

  if (!contacts || contacts.length === 0) {
    console.error("No contacts available");
    console.log(contacts);
    return <div>Loading contacts...</div>;
  }

  return (
    <>
      <Typography padding={2} variant="h6" component="div" style={{ flexGrow: 1 }}>
        Filtry
      </Typography>
      <div style={{ padding: "16px", display: "flex", gap: "16px", marginBottom: "16px" }}>
        <FormControl fullWidth>
          <InputLabel id="school-year-label">Rok szkolny</InputLabel>
          <Select
            labelId="school-year-label"
            value={schoolYearIdParam ?? ""}
            label="Rok szkolny"
            onChange={(e) => handleParamsChange("schoolYearId", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {schoolYears.map((schoolYear) => (
              <MenuItem key={schoolYear.schoolYearId} value={schoolYear.schoolYearId}>
                {schoolYear.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="program-label">Program</InputLabel>
          <Select
            labelId="program-label"
            value={programIdParam || ""}
            label="Program"
            defaultValue={programIdParam || ""}
            onChange={(e) => handleParamsChange("programId", e.target.value)}
          >
            <MenuItem value="" disabled defaultValue={programIdParam || ""}>
              Wybierz program
            </MenuItem>
            <MenuItem value="">All</MenuItem>
            {programs.map((program) => (
              <MenuItem key={program.programId} value={program.programId}>
                {program.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="institution-label">Instytucja</InputLabel>
          <Select
            value={institutionIdParam || ""}
            label="Instytucja"
            onChange={(e) => handleParamsChange("institutionId", e.target.value)}
          >
            {institutions.map((institution) => (
              <MenuItem key={institution.institutionId} value={institution.institutionId}>
                {institution.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="contact-label">Kontakt</InputLabel>
          <Select
            value={contactIdParam || ""}
            label="Kontakt"
            onChange={(e) => handleParamsChange("contactId", e.target.value)}
          >
            <MenuItem value="" disabled>
              Wybierz kontakt
            </MenuItem>
            <MenuItem value="">All</MenuItem>
            {contacts.map((contact: Contact) => (
              <MenuItem key={contact.contactId} value={contact.contactId}>
                {contact.firstName} {contact.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};
