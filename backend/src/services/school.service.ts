import {
  CreateInstitutionDto,
  CreateSchoolDto,
  CreateSchoolWithInstitutionDto,
  Institution,
  UpdateSchoolDto,
} from "../../../shared/types";
import { School } from "../../../shared/types";
import { SchoolRepository } from "../repositories/school.repository";
import { InstitutionRepository } from "../repositories/institution.repository";
import sqliteDbService from "./sqliteDbService";

class SchoolService {
  constructor(private schoolRepository: SchoolRepository, private institutionRepository: InstitutionRepository) {}
  getAllSchools = (): School[] | [] => {
    const schools = this.schoolRepository.getAllSchools();

    if (!schools || schools.length === 0) {
      throw new Error("No schools found");
    }

    return schools;
  };

  getSchoolById = (id: number) => {
    const school = this.schoolRepository.getSchoolById(id);

    return school || null;
  };

  // first add the institution and then add the school
  // if i want to add a school i need to add institution first

  addInstitutionSchool = (schoolInstitutionData: CreateSchoolWithInstitutionDto) => {
    const institution: CreateInstitutionDto = {
      name: schoolInstitutionData.name,
      address: schoolInstitutionData.address,
      city: schoolInstitutionData.city,
      postalCode: schoolInstitutionData.postalCode,
      phone: schoolInstitutionData.phone,
      email: schoolInstitutionData.email,
      municipality: schoolInstitutionData.municipality,
    };

    // Check if the required fields are provided
    if (!institution.name || !institution.address || !institution.postalCode || !institution.city) {
      throw new Error("Missing required fields");
    }
    // Start a transaction
    try {
      const transaction = sqliteDbService.getInstance().transaction(() => {
        const institutionId = this.institutionRepository.addInstitution(institution);

        if (!institutionId || institutionId.newInstitutionId === -1) {
          throw new Error("Error adding institution");
        }

        const school: CreateSchoolDto = {
          director: schoolInstitutionData.director,
          institutionId: institutionId.newInstitutionId,
        };
        const schoolId = this.schoolRepository.addSchool(institutionId.newInstitutionId, school.director);
        if (!schoolId || schoolId === -1) {
          throw new Error("Error adding school");
        }

        return { institutionId: institutionId.newInstitutionId, schoolId };
      });

      return transaction;
    } catch (error) {
      throw new Error(`Error adding institution and school: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  addSchool = (institutionId: Institution["institutionId"], director: School["director"]) => {
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
    // check if the school exists
    const school = this.schoolRepository.getSchoolById(id);
    if (!school || school === null) {
      throw new Error("School not found");
    }
    const result = this.schoolRepository.deleteSchool(id);

    if (!result) {
      throw new Error("Error deleting school");
    }
    return true;
  };

  updateSchool = (schoolId: School["schoolId"], school: UpdateSchoolDto) => {
    const result = this.schoolRepository.updateSchool(schoolId, school);
    if (!result) {
      throw new Error("Error updating school");
    }
    return true;
  };

  getSchoolByInstitutionId = (institutionId: Institution["institutionId"]) => {
    const school = this.schoolRepository.getSchoolByInstitutionId(institutionId);
    if (!school) {
      throw new Error("Error fetching school by institution id");
    }
    return school;
  };
}

export default SchoolService;
