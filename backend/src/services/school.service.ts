import { Institution, schoolParams } from "../../../shared/types";
import { School } from "../../../shared/types";
import { SchoolRepository } from "../repositories/school.repository";
import { InstitutionRepository } from "../repositories/institution.repository";
import sqliteDbService from "./sqliteDbService";

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
  // if i want to add a school i need to add institution first

  addInstitutionSchool = (schoolInstitutionData: schoolParams) => {
    const institution: Omit<Institution, "id"> = {
      name: schoolInstitutionData.name,
      address: schoolInstitutionData.address,
      city: schoolInstitutionData.city,
      postalCode: schoolInstitutionData.postalCode,
      phone: schoolInstitutionData.phone,
      email: schoolInstitutionData.email,
      website: schoolInstitutionData.website,
      municipality: schoolInstitutionData.municipality,
    };
    const school: Omit<School, "id"> = {
      director: schoolInstitutionData.director,
    };

    // Start a transaction
    try {
      sqliteDbService.getInstance().getDb().exec("BEGIN TRANSACTION");

      // Check if the required fields are provided
      if (!institution.name || !institution.address || !institution.postalCode || !institution.city) {
        throw new Error("Missing required fields");
      }
      const institutionId = this.institutionRepository.addInstitution(institution);

      if (!institutionId || institutionId.newInstitutionId === -1) {
        throw new Error("Error adding institution");
      }
      const schoolId = this.schoolRepository.addSchool(institutionId.newInstitutionId, school.director);
      if (!schoolId || schoolId === -1) {
        throw new Error("Error adding school");
      }

      sqliteDbService.getInstance().getDb().exec("COMMIT");

      return { institutionId: institutionId.newInstitutionId, schoolId };
    } catch (error) {
      sqliteDbService.getInstance().getDb().exec("ROLLBACK");
      throw error;
    }
  };

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
