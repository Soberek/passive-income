import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { Contact, Institution, Program, SchoolYear } from "../../../../shared/types";
import { ProgramCoordinatorTable } from "./ProgramCoordinatorTable";
import { ProgramCoordinatorFilters } from "./ProgramCoordinatorFilterButtons";
import { ProgramCoordinatorForm } from "./ProgramCoordinatorForm";
import { useSearchParams } from "react-router";

export type FormValues = {
  institutionId: number | null;
  contactId: number | null;
  programId: number | null;
  schoolYearId: number | null;
};

export interface ProgramCoordinatorData extends Program, Institution, Contact, SchoolYear {
  coordinatorId: number;
  contactName: string;
  institutionName: string;
  programName: string;
  schoolYear: SchoolYear;
  phone?: string;
}

export const ProgramCoordinator = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      institutionId: null,
      contactId: null,
      programId: null,
      schoolYearId: null,
    },
  });

  const { data: institutions } = useFetch<Institution[]>("http://localhost:3000/api/institutions");
  const { data: contacts } = useFetch<Contact[]>("http://localhost:3000/api/contacts");
  const { data: programs } = useFetch<Program[]>("http://localhost:3000/api/programs");
  const { data: schoolYears } = useFetch<SchoolYear[]>("http://localhost:3000/api/school-years");

  const { data: programCoordinators, refetch } = useFetch<ProgramCoordinatorData[]>(
    "http://localhost:3000/api/program-coordinators"
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const handleParamsChange = (field: keyof FormValues, value: string | null) => {
    if (value) {
      searchParams.set(field, value);
    } else {
      searchParams.delete(field);
    }
    setSearchParams(searchParams);
  };

  const institutionIdParam = searchParams.get("institutionId");
  const contactIdParam = searchParams.get("contactId");
  const programIdParam = searchParams.get("programId");
  const schoolYearIdParam = searchParams.get("schoolYearId");

  const handleFormSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);

    try {
      const requestBody = {
        institutionId: data.institutionId,
        contactId: data.contactId,
        programId: data.programId,
        schoolYearId: data.schoolYearId,
      };

      fetch("http://localhost:3000/api/program-coordinators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          console.log("Form submission successful:", result);
          refetch(); // Refetch the data to update the table
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <ProgramCoordinatorForm
        institutions={institutions || []}
        contacts={contacts || []}
        programs={programs || []}
        schoolYears={schoolYears || []}
        handleFormSubmit={handleFormSubmit}
        handleSubmit={handleSubmit}
        control={control}
      />
      <ProgramCoordinatorFilters
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
      <ProgramCoordinatorTable data={programCoordinators || []} />
    </>
  );
};
