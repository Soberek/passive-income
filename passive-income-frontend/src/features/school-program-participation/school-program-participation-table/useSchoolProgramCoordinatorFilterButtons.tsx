import { useSearchParams } from "react-router";

import { useMemo } from "react";

import { FormValues, SchoolProgramParticipationTableI } from "../types";

export const useSchoolProgramParticipationFilterButtons = ({
  participationData,
}: {
  participationData: SchoolProgramParticipationTableI[];
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

  const institutionIdParam = searchParams.get("institutionId");
  const contactIdParam = searchParams.get("contactId");
  const programIdParam = searchParams.get("programId");
  const schoolYearIdParam = searchParams.get("schoolYearId");

  const filterData = useMemo(() => {
    return (data: SchoolProgramParticipationTableI[]) => {
      return data.filter((item) => {
        return (
          (!schoolYearIdParam || String(item.schoolYearId) === schoolYearIdParam) &&
          (!institutionIdParam || String(item.institutionId) === institutionIdParam) &&
          (!contactIdParam || String(item.contactId) === contactIdParam) &&
          (!programIdParam || String(item.programId) === programIdParam)
        );
      });
    };
  }, [schoolYearIdParam, institutionIdParam, contactIdParam, programIdParam]);
  const filteredProgramCoordinatorsData = filterData(participationData || []);

  return {
    institutionIdParam,
    contactIdParam,
    programIdParam,
    schoolYearIdParam,
    handleParamsChange,
    filteredProgramCoordinatorsData,
  };
};
