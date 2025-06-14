import { NextFunction, Request, Response } from "express";
import SchoolProgramParticipationService from "./school_program_participation.service";
import { AppError } from "../../handlers/error.handler";
class SchoolProgramParticipationController {
  constructor(private schoolProgramParticipationService: SchoolProgramParticipationService) {}

  addSchoolProgramParticipation = (req: Request, res: Response, next: NextFunction): void => {
    const { schoolId, programId, schoolYearId, contactId } = req.body;
    console.log(req.body);
    console.log(schoolId, programId, schoolYearId, contactId);
    const result = this.schoolProgramParticipationService.add({ schoolId, programId, schoolYearId, contactId });

    console.log("result: ", result);
    if (result) {
      res.status(201).send({ message: "School program participation added successfully", data: result });
      return;
    } else {
      next(new AppError("Error adding school program participation", 400));
      return;
    }
  };

  getSchoolProgramParticipation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.schoolProgramParticipationService.getAll();

      if (result) {
        res.status(200).send({ message: "School program participation retrieved successfully", data: result });
      } else {
        next(new AppError("No school program participation found", 404));
      }
    } catch (error) {
      next(new AppError("Error retrieving school program participation", 500));
    }
  };
}

export default SchoolProgramParticipationController;
