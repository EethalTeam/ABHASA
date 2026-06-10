"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSource = exports.updateSource = exports.getSourceById = exports.getAllSources = exports.createSource = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createSource = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;
        if (!name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Source name is required");
        const existing = await prisma_1.prisma.source.findFirst({ where: { name } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Source already exists");
        const source = await prisma_1.prisma.source.create({ data: { name, description, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Source created successfully", source);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createSource = createSource;
const getAllSources = async (req, res) => {
    try {
        const { isActive } = req.query;
        const sources = await prisma_1.prisma.source.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Sources retrieved successfully", sources);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllSources = getAllSources;
const getSourceById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Source ID is required");
        const source = await prisma_1.prisma.source.findUnique({ where: { id } });
        if (!source)
            return (0, controllerHelper_1.sendNotFound)(res, "Source not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Source retrieved successfully", source);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getSourceById = getSourceById;
const updateSource = async (req, res) => {
    try {
        const { id, name, description, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Source ID is required");
        const source = await prisma_1.prisma.source.findUnique({ where: { id } });
        if (!source)
            return (0, controllerHelper_1.sendNotFound)(res, "Source not found");
        if (name && name !== source.name) {
            const existing = await prisma_1.prisma.source.findFirst({ where: { name, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Source already exists");
        }
        const updated = await prisma_1.prisma.source.update({
            where: { id },
            data: { name: name ?? source.name, description: description ?? source.description, isActive: isActive ?? source.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Source updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateSource = updateSource;
const deleteSource = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Source ID is required");
        const source = await prisma_1.prisma.source.findUnique({ where: { id } });
        if (!source)
            return (0, controllerHelper_1.sendNotFound)(res, "Source not found");
        await prisma_1.prisma.source.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Source deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteSource = deleteSource;
