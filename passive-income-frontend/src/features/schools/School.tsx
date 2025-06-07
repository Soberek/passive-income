import React from "react";
import SchoolInstitutionForm from "./SchoolInstitutionForm";
import SchoolInstitutionTable from "./SchoolInstitutionTable";
import { useInstitutions } from "../../hooks/useInstitutions";
import { useSchoolInstitutionForm } from "./useSchoolInstitutionForm";

const SchoolsPage: React.FC = () => {
  const { institutions, loading } = useInstitutions();
  const { handleSubmit } = useSchoolInstitutionForm();

  return (
    <div>
      <SchoolInstitutionForm onSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      {!loading && institutions.length === 0 && <p>No institutions found.</p>}
      {!loading && institutions.length > 0 && <h2>Institutions</h2>}

      {!loading && institutions.length > 0 && (
        <SchoolInstitutionTable
          data={institutions}
          rowsPerPage={5}
          page={0}
          totalCount={institutions.length}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      )}
    </div>
  );
};

export default SchoolsPage;
