"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConsultationStatus = exports.updateConsultationStatus = exports.getConsultationStatusById = exports.getAllConsultationStatuses = exports.createConsultationStatus = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createConsultationStatus = async (req, res) => {
    try {
        const { code, name, description, isActive } = req.body;
        if (!code || !name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Code and name are required");
        const formattedCode = code.toUpperCase();
        const existing = await prisma_1.prisma.consultationStatusMaster.findFirst({ where: { code: formattedCode } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation status code already exists");
        const status = await prisma_1.prisma.consultationStatusMaster.create({ data: { code: formattedCode, name, description, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Consultation status created successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createConsultationStatus = createConsultationStatus;
const getAllConsultationStatuses = async (req, res) => {
    try {
        const { isActive } = req.query;
        const statuses = await prisma_1.prisma.consultationStatusMaster.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation statuses fetched successfully", statuses);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllConsultationStatuses = getAllConsultationStatuses;
const getConsultationStatusById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "ID is required");
        const status = await prisma_1.prisma.consultationStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation status not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation status fetched successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getConsultationStatusById = getConsultationStatusById;
const updateConsultationStatus = async (req, res) => {
    try {
        const { id, code, name, description, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "ID is required");
        const status = await prisma_1.prisma.consultationStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation status not found");
        if (code) {
            const formattedCode = code.toUpperCase();
            const existing = await prisma_1.prisma.consultationStatusMaster.findFirst({ where: { code: formattedCode, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Consultation status code already exists");
        }
        const updated = await prisma_1.prisma.consultationStatusMaster.update({
            where: { id },
            data: { code: code ? code.toUpperCase() : status.code, name: name ?? status.name, description: description ?? status.description, isActive: isActive ?? status.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation status updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateConsultationStatus = updateConsultationStatus;
const deleteConsultationStatus = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "ID is required");
        const status = await prisma_1.prisma.consultationStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation status not found");
        await prisma_1.prisma.consultationStatusMaster.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation status deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteConsultationStatus = deleteConsultationStatus;
