import React from "react";
import SchoolInstitutionForm from "./SchoolInstitutionForm";
import SchoolInstitutionTable from "./SchoolInstitutionTable";

import { useSchoolInstitutionForm } from "./useSchoolInstitutionForm";
import { useFetch } from "../../hooks/useFetch";
import { Institution } from "../../../../shared/types";

const SchoolsPage: React.FC = () => {
  const { data, loading } = useFetch<Institution[]>("http://localhost:3000/api/institutions");
  const { handleSubmit } = useSchoolInstitutionForm();

  return (
    <div>
      <SchoolInstitutionForm onSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      {!loading && data && data.length === 0 && <p>No institutions found.</p>}
      {!loading && data && data.length > 0 && <h2>Institutions</h2>}

      {!loading && data && data.length > 0 && (
        <SchoolInstitutionTable
          data={data}
          rowsPerPage={5}
          page={0}
          totalCount={data.length}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      )}
    </div>
  );
};

export default SchoolsPage;
