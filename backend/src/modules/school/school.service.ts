import { Institution } from "../../../../shared/types";
import { School } from "../../../../shared/types";
import { SchoolRepository } from "../school/school.repository";
import { InstitutionRepository } from "../institution/institution.repository";
import sqliteDbService from "../../services/sqlite_db.service";
import { schoolSchema, schoolCreateSchema, schoolUpdateSchema } from "./school.schema";

class SchoolService {
  constructor(private schoolRepository: SchoolRepository, private institutionRepository: InstitutionRepository) {}
  getAllSchools = (): School[] | [] => {
    const schools = this.schoolRepository.getAll();

    if (!schools || schools.length === 0) {
      throw new Error("No schools found");
    }

    return schools;
  };

  getSchoolById = (id: number) => {
    const validation = schoolSchema.shape.schoolId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid school ID " + JSON.stringify(validation.error.issues));
    }
    const school = this.schoolRepository.getById(id);

    return school || null;
  };

  // first add the institution and then add the school
  // if i want to add a school i need to add institution first

  addInstitutionSchool = async (
    schoolInstitutionData: Omit<Institution, "institutionId"> & Omit<School, "schoolId" | "institutionId">
  ): Promise<{ institutionId: number; schoolId: number }> => {
    const institution: Omit<Institution, "institutionId"> = {
      name: schoolInstitutionData.name,
      address: schoolInstitutionData.address,
      city: schoolInstitutionData.city,
      postalCode: schoolInstitutionData.postalCode,
      phone: schoolInstitutionData.phone,
      email: schoolInstitutionData.email,
      municipality: schoolInstitutionData.municipality,
    };

    // Validate the institution data

    // Check if the required fields are provided
    if (!institution.name || !institution.address || !institution.postalCode || !institution.city) {
      throw new Error("Missing required fields");
    }
    // Start a transaction
    try {
      const transaction = sqliteDbService.getInstance().transaction(() => {
        const newInstitutionId = this.institutionRepository.add(institution);

        if (!newInstitutionId) {
          throw new Error("Error adding institution");
        }

        const school: Omit<School, "schoolId"> = {
          director: schoolInstitutionData.director,
          institutionId: newInstitutionId,
        };
        const schoolId = this.schoolRepository.add(school);
        if (!schoolId || schoolId === -1) {
          throw new Error("Error adding school");
        }

        return { institutionId: newInstitutionId, schoolId };
      });

      return await transaction;
    } catch (error) {
      throw new Error(`Error adding institution and school: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  addSchool = (institutionId: Institution["institutionId"], director: School["director"]) => {
    // check if the institution exists
    const institution = this.institutionRepository.getById(institutionId);

    // Check if the institution exists
    // If it doesn't exist, return an error or handle it as needed
    // For example, you can log an error message or throw an exception
    if (!institution) {
      throw new Error("Institution not found");
    }

    if (typeof institutionId !== "number") {
      throw new Error("Invalid institution ID");
    }

    const schoolId = this.schoolRepository.add({
      director,
      institutionId,
    });
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
    const school = this.schoolRepository.getById(id);
    if (!school || school === null) {
      throw new Error("School not found");
    }
    const result = this.schoolRepository.delete(id);

    if (!result) {
      throw new Error("Error deleting school");
    }
    return true;
  };

  updateSchool = (schoolId: School["schoolId"], school: Partial<School>) => {
    const schoolValidation = schoolSchema.partial().safeParse(school);
    const idValidation = schoolSchema.shape.schoolId.safeParse(schoolId);
    if (!idValidation.success) {
      throw new Error("Invalid school ID " + JSON.stringify(idValidation.error.issues));
    }
    if (!schoolValidation.success) {
      const errors = schoolValidation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    const result = this.schoolRepository.update(schoolId, school);
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
