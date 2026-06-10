"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientStatus = exports.updatePatientStatus = exports.getPatientStatusById = exports.getAllPatientStatuses = exports.createPatientStatus = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createPatientStatus = async (req, res) => {
    try {
        const { code, name, description, isActive } = req.body;
        if (!code || !name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Code and name are required");
        const existing = await prisma_1.prisma.patientStatusMaster.findFirst({ where: { code } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient status code already exists");
        const status = await prisma_1.prisma.patientStatusMaster.create({ data: { code, name, description, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Patient status created successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createPatientStatus = createPatientStatus;
const getAllPatientStatuses = async (req, res) => {
    try {
        const { isActive } = req.query;
        const statuses = await prisma_1.prisma.patientStatusMaster.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Patient statuses retrieved successfully", statuses);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllPatientStatuses = getAllPatientStatuses;
const getPatientStatusById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient status ID is required");
        const status = await prisma_1.prisma.patientStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Patient status not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Patient status retrieved successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getPatientStatusById = getPatientStatusById;
const updatePatientStatus = async (req, res) => {
    try {
        const { id, code, name, description, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient status ID is required");
        const status = await prisma_1.prisma.patientStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Patient status not found");
        if (code && code !== status.code) {
            const existing = await prisma_1.prisma.patientStatusMaster.findFirst({ where: { code, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Patient status code already exists");
        }
        const updated = await prisma_1.prisma.patientStatusMaster.update({
            where: { id },
            data: { code: code ?? status.code, name: name ?? status.name, description: description ?? status.description, isActive: isActive ?? status.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Patient status updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updatePatientStatus = updatePatientStatus;
const deletePatientStatus = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Patient status ID is required");
        const status = await prisma_1.prisma.patientStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Patient status not found");
        await prisma_1.prisma.patientStatusMaster.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Patient status deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deletePatientStatus = deletePatientStatus;
