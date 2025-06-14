import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router";

import { FormValues } from "./ProgramCoordinator";
import { Contact, Institution, Program, SchoolYear } from "../../../../shared/types";

interface ProgramCoordinatorFiltersProps {
  institutions: Institution[];
  programs: Program[];
  schoolYears: SchoolYear[];
  contacts: Contact[];
}

export const ProgramCoordinatorFilters: React.FC<ProgramCoordinatorFiltersProps> = ({
  institutions,
  programs,
  schoolYears,
  contacts,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParamsChange = (field: keyof FormValues, value: string | null) => {
    if (value) {
      searchParams.set(field, value);
    } else {
      searchParams.delete(field);
    }
    setSearchParams(searchParams);
  };

  const institutionId = searchParams.get("institutionId");
  const contactId = searchParams.get("contactId");
  const programId = searchParams.get("programId");
  const schoolYearId = searchParams.get("schoolYearId");

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
    <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
      <FormControl>
        <InputLabel>School Year</InputLabel>
        <Select
          value={schoolYearId || ""}
          label="School Year"
          onChange={(e) => handleParamsChange("schoolYearId", e.target.value)}
        >
          <MenuItem value="" disabled defaultValue={schoolYearId || ""}>
            Wybierz rok szkolny
          </MenuItem>
          <MenuItem value="">All</MenuItem>
          {schoolYears.map((schoolYear) => (
            <MenuItem key={schoolYear.schoolYearId} value={schoolYear.schoolYearId}>
              {schoolYear.year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Program</InputLabel>
        <Select
          value={programId || ""}
          label="Program"
          defaultValue={programId || ""}
          onChange={(e) => handleParamsChange("programId", e.target.value)}
        >
          <MenuItem value="" disabled defaultValue={programId || ""}>
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
      <FormControl>
        <InputLabel>Instytucja</InputLabel>
        <Select
          value={institutionId || ""}
          label="Institution"
          onChange={(e) => handleParamsChange("institutionId", e.target.value)}
        >
          {institutions.map((institution) => (
            <MenuItem key={institution.institutionId} value={institution.institutionId}>
              {institution.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Kontakt</InputLabel>
        <Select
          value={contactId || ""}
          label="Contact"
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
  );
};
