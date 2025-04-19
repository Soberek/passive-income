"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactService_1 = __importDefault(require("../services/contactService"));
class ContactController {
    contactService;
    constructor() {
        this.contactService = new contactService_1.default();
    }
    getContacts = (_, res) => {
        try {
            const contacts = this.contactService.getAllContacts();
            res.status(200).json(contacts);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching contacts", error });
        }
    };
    addContact = (req, res) => {
        const { firstName, lastName, email, phone } = req.body;
        if (!firstName || !lastName) {
            res
                .status(400)
                .json({ message: "First name and last name are required." });
            return;
        }
        try {
            const newContact = this.contactService.addNewContact(firstName, lastName, email, phone);
            res.status(201).json(newContact);
        }
        catch (error) {
            res.status(500).json({ message: "Error adding contact", error });
        }
    };
}
exports.default = ContactController;
