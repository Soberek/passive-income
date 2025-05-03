import { Institution, SchoolWithInstitutionData } from "../../../shared/types";
import { School } from "../../../shared/types";
import { SchoolRepository } from "../repositories/school.repository";

class SchoolService {
  private schoolRepository: SchoolRepository;
  constructor(schoolRepository: SchoolRepository) {
    this.schoolRepository = schoolRepository;
  }
  getAllSchools = () => {
    const schools = this.schoolRepository.getAllSchools();
    if (!schools) {
      console.error("Error fetching all schools");
      return [];
    }
    return schools;
  };
  getSchoolById = (id: number) => {
    const school = this.schoolRepository.getSchoolById(id);
    if (!school) {
      console.error("Error fetching school by id");
      return null;
    }
    return school;
  };

  addSchool = (institutionId: Institution["id"], director: School["director"]) => {
    const schoolId = this.schoolRepository.addSchool(institutionId, director);
    if (schoolId === -1) {
      console.error("Error adding school");
      return -1;
    }
    return schoolId;
  };

  deleteSchool = (id: number) => {
    const result = this.schoolRepository.deleteSchool(id);
    if (!result) {
      console.error("Error deleting school");
      return false;
    }
    return true;
  };

  updateSchool = (id: number, institutionId: Institution["id"], director: School["director"]) => {
    const result = this.schoolRepository.updateSchool(id, institutionId, director);
    if (!result) {
      console.error("Error updating school");
      return false;
    }
    return true;
  };

  getSchoolByInstitutionId = (institutionId: Institution["id"]) => {
    const school = this.schoolRepository.getSchoolByInstitutionId(institutionId);
    if (!school) {
      console.error("Error fetching school by institution id");
      return null;
    }
    return school;
  };
}

export default SchoolService;
