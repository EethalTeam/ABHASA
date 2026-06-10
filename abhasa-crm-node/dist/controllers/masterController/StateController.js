"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.getStateById = exports.getAllStates = exports.createState = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createState = async (req, res) => {
    try {
        const { name, countryId, isActive } = req.body;
        if (!name || !countryId)
            return (0, controllerHelper_1.sendBadRequest)(res, "Name and countryId are required");
        const country = await prisma_1.prisma.country.findUnique({ where: { id: countryId } });
        if (!country)
            return (0, controllerHelper_1.sendNotFound)(res, "Country not found");
        const existing = await prisma_1.prisma.state.findFirst({ where: { name, countryId } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "State already exists in this country");
        const state = await prisma_1.prisma.state.create({ data: { name, countryId, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "State created successfully", state);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createState = createState;
const getAllStates = async (req, res) => {
    try {
        const { isActive } = req.query;
        const states = await prisma_1.prisma.state.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            include: { country: { select: { id: true, name: true, code: true } } },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "States retrieved successfully", states);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllStates = getAllStates;
const getStateById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "State ID is required");
        const state = await prisma_1.prisma.state.findUnique({
            where: { id },
            include: { country: { select: { id: true, name: true, code: true } } },
        });
        if (!state)
            return (0, controllerHelper_1.sendNotFound)(res, "State not found");
        return (0, controllerHelper_1.sendSuccess)(res, "State retrieved successfully", state);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getStateById = getStateById;
const updateState = async (req, res) => {
    try {
        const { id, name, countryId, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "State ID is required");
        const state = await prisma_1.prisma.state.findUnique({ where: { id } });
        if (!state)
            return (0, controllerHelper_1.sendNotFound)(res, "State not found");
        if (countryId) {
            const country = await prisma_1.prisma.country.findUnique({ where: { id: countryId } });
            if (!country)
                return (0, controllerHelper_1.sendNotFound)(res, "Country not found");
        }
        if (name || countryId) {
            const existing = await prisma_1.prisma.state.findFirst({
                where: { name: name ?? state.name, countryId: countryId ?? state.countryId, NOT: { id } },
            });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "State already exists in this country");
        }
        const updated = await prisma_1.prisma.state.update({
            where: { id },
            data: { name: name ?? state.name, countryId: countryId ?? state.countryId, isActive: isActive ?? state.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "State updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "State ID is required");
        const state = await prisma_1.prisma.state.findUnique({ where: { id } });
        if (!state)
            return (0, controllerHelper_1.sendNotFound)(res, "State not found");
        await prisma_1.prisma.state.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "State deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteState = deleteState;
