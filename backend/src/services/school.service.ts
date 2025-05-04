import { Institution, SchoolWithInstitutionData } from "../../../shared/types";
import { School } from "../../../shared/types";
import { SchoolRepository } from "../repositories/school.repository";
import { InstitutionRepository } from "../repositories/institution.repository";

class SchoolService {
  constructor(private schoolRepository: SchoolRepository, private institutionRepository: InstitutionRepository) {}
  getAllSchools = () => {
    const schools = this.schoolRepository.getAllSchools();
    if (!schools) {
      throw new Error("Error fetching all schools");
    }
    return schools;
  };
  getSchoolById = (id: number) => {
    const school = this.schoolRepository.getSchoolById(id);
    if (!school) {
      throw new Error("School not found or invalid ID");
    }
    return school;
  };

  // first add the institution and then add the school
  addSchool = (institutionId: Institution["id"], director: School["director"]) => {
    // check if the institution exists
    const institution = this.institutionRepository.getInstitutionById(institutionId);

    // Check if the institution exists
    // If it doesn't exist, return an error or handle it as needed
    // For example, you can log an error message or throw an exception
    if (!institution) {
      throw new Error("Institution not found");
    }

    if (typeof institutionId !== "bigint" && typeof institutionId !== "number") {
      throw new Error("Invalid institution ID");
    }

    const schoolId = this.schoolRepository.addSchool(institutionId, director);
    if (schoolId === -1) {
      throw new Error("Error adding school");
    }
    if (!schoolId) {
      throw new Error("Error adding school");
    }
    return schoolId;
  };

  deleteSchool = (id: number) => {
    const result = this.schoolRepository.deleteSchool(id);
    if (!result) {
      throw new Error("Error deleting school");
    }
    return true;
  };

  updateSchool = (id: number, institutionId: Institution["id"], director: School["director"]) => {
    const result = this.schoolRepository.updateSchool(id, institutionId, director);
    if (!result) {
      throw new Error("Error updating school");
    }
    return true;
  };

  getSchoolByInstitutionId = (institutionId: Institution["id"]) => {
    const school = this.schoolRepository.getSchoolByInstitutionId(institutionId);
    if (!school) {
      throw new Error("Error fetching school by institution id");
    }
    return school;
  };
}

export default SchoolService;
