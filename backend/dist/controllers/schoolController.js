"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const institutionsService_1 = require("../services/institutionsService");
const schoolService_1 = __importDefault(require("../services/schoolService"));
class schoolController {
    schoolService;
    institutionsService;
    constructor() {
        this.schoolService = new schoolService_1.default();
        this.institutionsService = new institutionsService_1.InstitutionsService();
    }
    getAllSchools(_, res) {
        try {
            const schools = this.schoolService.getAllSchools();
            if (!schools) {
                res.status(404).json({ message: "No schools found" });
                return;
            }
            res.status(200).json(schools);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching schools" });
            return;
        }
    }
    createSchool(req, res) {
        try {
            const { name, address, postal_code, city, phone, email, website, municipality, director, } = req.body;
            if (!name || !address || !postal_code || !city) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }
            // 1. Step 1: Create institution
            const newInstitution = this.institutionsService.addInstitution(name, address, postal_code, city, phone, email, website, municipality);
            if (!newInstitution) {
                res.status(500).json({ message: "Error creating institution" });
                return;
            }
            // 2. Step 2: Create school, pass institutionId from the new institution
            if (!director || director.trim() === "") {
                res.status(400).json({ message: "Missing director field" });
                return;
            }
            const newSchool = this.schoolService.addSchool(newInstitution.newInstitutionId, director);
            if (!newSchool) {
                res.status(500).json({ message: "Error creating school" });
                return;
            }
            // 3. Step 3: Return the new school with success message
            res.status(201).json({
                message: "School created successfully",
                newSchoolId: newSchool,
                newInstitutionId: newInstitution.newInstitutionId,
            });
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error creating school" });
            return;
        }
    }
}
exports.default = schoolController;
