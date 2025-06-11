import { NextFunction, Request, Response } from "express";
import SchoolProgramParticipationService from "./school_program_participation.service";
import { AppError } from "../../handlers/error.handler";
class SchoolProgramParticipationController {
  constructor(private schoolProgramParticipationService: SchoolProgramParticipationService) {}

  addSchoolProgramParticipation = (req: Request, res: Response, next: NextFunction): void => {
    const { schoolId, programId, schoolYearId } = req.body;
    console.log(req.body);
    console.log(schoolId, programId, schoolYearId);
    const result = this.schoolProgramParticipationService.add({ schoolId, programId, schoolYearId });

    console.log("result: ", result);
    if (result) {
      res.status(201).send({ message: "School program participation added successfully", data: result });
      return;
    } else {
      next(new AppError("Error adding school program participation", 400));
      return;
    }
  };
}

export default SchoolProgramParticipationController;
