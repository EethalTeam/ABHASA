"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.getAllPatients = exports.createPatient = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createPatient = async (req, res) => {
    try {
        const { patientName, callerName, relationship, phone, email, city, consultationStatus, paymentStatus, psychologistAssigned, assignedBDM, lastConsultation } = req.body;
        if (!patientName || !callerName || !phone)
            return (0, controllerHelper_1.sendBadRequest)(res, "patientName, callerName and phone are required");
        const existing = await prisma_1.prisma.patient.findFirst({ where: { phone } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient already exists with this phone number");
        const patient = await prisma_1.prisma.patient.create({ data: { patientName, callerName, relationship, phone, email, city, consultationStatus, paymentStatus, psychologistAssigned, assignedBDM, lastConsultation } });
        return (0, controllerHelper_1.sendCreated)(res, "Patient created successfully", patient);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createPatient = createPatient;
const getAllPatients = async (req, res) => {
    try {
        const { isActive } = req.query;
        const patients = await prisma_1.prisma.patient.findMany({ orderBy: { createdAt: "desc" } });
        return (0, controllerHelper_1.sendSuccess)(res, "Patients retrieved successfully", patients);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllPatients = getAllPatients;
const getPatientById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient ID is required");
        const patient = await prisma_1.prisma.patient.findUnique({ where: { id } });
        if (!patient)
            return (0, controllerHelper_1.sendNotFound)(res, "Patient not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Patient retrieved successfully", patient);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getPatientById = getPatientById;
const updatePatient = async (req, res) => {
    try {
        const { id, phone, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient ID is required");
        const patient = await prisma_1.prisma.patient.findUnique({ where: { id } });
        if (!patient)
            return (0, controllerHelper_1.sendNotFound)(res, "Patient not found");
        if (phone && phone !== patient.phone) {
            const existing = await prisma_1.prisma.patient.findFirst({ where: { phone, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Phone number already exists");
        }
        const updated = await prisma_1.prisma.patient.update({ where: { id }, data: { phone: phone ?? patient.phone, ...rest } });
        return (0, controllerHelper_1.sendSuccess)(res, "Patient updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updatePatient = updatePatient;
const deletePatient = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient ID is required");
        const patient = await prisma_1.prisma.patient.findUnique({ where: { id } });
        if (!patient)
            return (0, controllerHelper_1.sendNotFound)(res, "Patient not found");
        await prisma_1.prisma.patient.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Patient deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deletePatient = deletePatient;
