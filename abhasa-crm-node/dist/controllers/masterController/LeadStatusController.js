"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatus = exports.updateStatus = exports.getStatusById = exports.getAllStatuses = exports.createStatus = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createStatus = async (req, res) => {
    try {
        const { name, color, description, isActive } = req.body;
        if (!name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Status name is required");
        const existing = await prisma_1.prisma.status.findFirst({ where: { name } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Status already exists");
        const status = await prisma_1.prisma.status.create({ data: { name, color, description, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Status created successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createStatus = createStatus;
const getAllStatuses = async (req, res) => {
    try {
        const { isActive } = req.query;
        const statuses = await prisma_1.prisma.status.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Statuses retrieved successfully", statuses);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllStatuses = getAllStatuses;
const getStatusById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Status ID is required");
        const status = await prisma_1.prisma.status.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Status not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Status retrieved successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getStatusById = getStatusById;
const updateStatus = async (req, res) => {
    try {
        const { id, name, color, description, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Status ID is required");
        const status = await prisma_1.prisma.status.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Status not found");
        if (name && name !== status.name) {
            const existing = await prisma_1.prisma.status.findFirst({ where: { name, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Status already exists");
        }
        const updated = await prisma_1.prisma.status.update({
            where: { id },
            data: { name: name ?? status.name, color: color ?? status.color, description: description ?? status.description, isActive: isActive ?? status.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Status updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateStatus = updateStatus;
const deleteStatus = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Status ID is required");
        const status = await prisma_1.prisma.status.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Status not found");
        await prisma_1.prisma.status.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Status deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteStatus = deleteStatus;
