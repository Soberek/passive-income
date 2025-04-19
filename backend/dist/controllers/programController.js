"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const programService_1 = __importDefault(require("../services/programService"));
class ProgramController {
    programService;
    constructor() {
        this.programService = new programService_1.default();
    }
    getPrograms = (_, res) => {
        try {
            const programs = this.programService.getPrograms();
            res.status(200).json(programs);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching programs", error });
        }
    };
    addProgram = (req, res) => {
        const { name, description, programType } = req.body;
        if (!name || !programType) {
            res.status(400).json({ message: "Name and program type are required." });
            return;
        }
        try {
            const newProgram = this.programService.addProgram(name, description, programType);
            res.status(201).json(newProgram);
        }
        catch (error) {
            res.status(500).json({ message: "Error adding program", error });
        }
    };
}
exports.default = ProgramController;
