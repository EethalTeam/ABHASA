"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceType = exports.updateServiceType = exports.getServiceTypeById = exports.getAllServiceTypes = exports.createServiceType = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createServiceType = async (req, res) => {
    try {
        const { name, code, description, isActive } = req.body;
        if (!name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Service type name is required");
        const existingName = await prisma_1.prisma.serviceType.findFirst({ where: { name } });
        if (existingName)
            return (0, controllerHelper_1.sendBadRequest)(res, "Service type already exists");
        if (code) {
            const existingCode = await prisma_1.prisma.serviceType.findFirst({ where: { code: code.toUpperCase() } });
            if (existingCode)
                return (0, controllerHelper_1.sendBadRequest)(res, "Service type code already exists");
        }
        const serviceType = await prisma_1.prisma.serviceType.create({ data: { name, code: code ? code.toUpperCase() : null, description, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Service type created successfully", serviceType);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createServiceType = createServiceType;
const getAllServiceTypes = async (req, res) => {
    try {
        const { isActive } = req.query;
        const serviceTypes = await prisma_1.prisma.serviceType.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Service types retrieved successfully", serviceTypes);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllServiceTypes = getAllServiceTypes;
const getServiceTypeById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Service type ID is required");
        const serviceType = await prisma_1.prisma.serviceType.findUnique({ where: { id } });
        if (!serviceType)
            return (0, controllerHelper_1.sendNotFound)(res, "Service type not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Service type retrieved successfully", serviceType);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getServiceTypeById = getServiceTypeById;
const updateServiceType = async (req, res) => {
    try {
        const { id, name, code, description, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Service type ID is required");
        const serviceType = await prisma_1.prisma.serviceType.findUnique({ where: { id } });
        if (!serviceType)
            return (0, controllerHelper_1.sendNotFound)(res, "Service type not found");
        if (name && name !== serviceType.name) {
            const existing = await prisma_1.prisma.serviceType.findFirst({ where: { name, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Service type already exists");
        }
        if (code) {
            const existing = await prisma_1.prisma.serviceType.findFirst({ where: { code: code.toUpperCase(), NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Service type code already exists");
        }
        const updated = await prisma_1.prisma.serviceType.update({
            where: { id },
            data: { name: name ?? serviceType.name, code: code ? code.toUpperCase() : serviceType.code, description: description ?? serviceType.description, isActive: isActive ?? serviceType.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Service type updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateServiceType = updateServiceType;
const deleteServiceType = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Service type ID is required");
        const serviceType = await prisma_1.prisma.serviceType.findUnique({ where: { id } });
        if (!serviceType)
            return (0, controllerHelper_1.sendNotFound)(res, "Service type not found");
        await prisma_1.prisma.serviceType.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Service type deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteServiceType = deleteServiceType;
