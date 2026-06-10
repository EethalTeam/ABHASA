"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.getCityById = exports.getAllCities = exports.createCity = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createCity = async (req, res) => {
    try {
        const { name, stateId, isActive } = req.body;
        if (!name || !stateId)
            return (0, controllerHelper_1.sendBadRequest)(res, "Name and stateId are required");
        const state = await prisma_1.prisma.state.findUnique({ where: { id: stateId } });
        if (!state)
            return (0, controllerHelper_1.sendNotFound)(res, "State not found");
        const existing = await prisma_1.prisma.city.findFirst({ where: { name, stateId } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "City already exists in this state");
        const city = await prisma_1.prisma.city.create({ data: { name, stateId, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "City created successfully", city);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createCity = createCity;
const getAllCities = async (req, res) => {
    try {
        const { isActive } = req.query;
        const cities = await prisma_1.prisma.city.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            include: { state: { select: { id: true, name: true } } },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Cities retrieved successfully", cities);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllCities = getAllCities;
const getCityById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "City ID is required");
        const city = await prisma_1.prisma.city.findUnique({
            where: { id },
            include: { state: { select: { id: true, name: true } } },
        });
        if (!city)
            return (0, controllerHelper_1.sendNotFound)(res, "City not found");
        return (0, controllerHelper_1.sendSuccess)(res, "City retrieved successfully", city);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getCityById = getCityById;
const updateCity = async (req, res) => {
    try {
        const { id, name, stateId, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "City ID is required");
        const city = await prisma_1.prisma.city.findUnique({ where: { id } });
        if (!city)
            return (0, controllerHelper_1.sendNotFound)(res, "City not found");
        if (stateId) {
            const state = await prisma_1.prisma.state.findUnique({ where: { id: stateId } });
            if (!state)
                return (0, controllerHelper_1.sendNotFound)(res, "State not found");
        }
        if (name || stateId) {
            const existing = await prisma_1.prisma.city.findFirst({
                where: { name: name ?? city.name, stateId: stateId ?? city.stateId, NOT: { id } },
            });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "City already exists in this state");
        }
        const updated = await prisma_1.prisma.city.update({
            where: { id },
            data: { name: name ?? city.name, stateId: stateId ?? city.stateId, isActive: isActive ?? city.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "City updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateCity = updateCity;
const deleteCity = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "City ID is required");
        const city = await prisma_1.prisma.city.findUnique({ where: { id } });
        if (!city)
            return (0, controllerHelper_1.sendNotFound)(res, "City not found");
        await prisma_1.prisma.city.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "City deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteCity = deleteCity;
