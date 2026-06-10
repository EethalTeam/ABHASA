"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGender = exports.updateGender = exports.getGenderById = exports.getAllGenders = exports.createGender = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createGender = async (req, res) => {
    try {
        const { code, name, isActive } = req.body;
        if (!code || !name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Code and name are required");
        const formattedCode = code.toUpperCase();
        const existingCode = await prisma_1.prisma.gender.findFirst({ where: { code: formattedCode } });
        if (existingCode)
            return (0, controllerHelper_1.sendBadRequest)(res, "Gender code already exists");
        const existingName = await prisma_1.prisma.gender.findFirst({ where: { name } });
        if (existingName)
            return (0, controllerHelper_1.sendBadRequest)(res, "Gender name already exists");
        const gender = await prisma_1.prisma.gender.create({ data: { code: formattedCode, name, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Gender created successfully", gender);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createGender = createGender;
const getAllGenders = async (req, res) => {
    try {
        const { isActive } = req.query;
        const genders = await prisma_1.prisma.gender.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Genders retrieved successfully", genders);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllGenders = getAllGenders;
const getGenderById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Gender ID is required");
        const gender = await prisma_1.prisma.gender.findUnique({ where: { id } });
        if (!gender)
            return (0, controllerHelper_1.sendNotFound)(res, "Gender not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Gender retrieved successfully", gender);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getGenderById = getGenderById;
const updateGender = async (req, res) => {
    try {
        const { id, code, name, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Gender ID is required");
        const gender = await prisma_1.prisma.gender.findUnique({ where: { id } });
        if (!gender)
            return (0, controllerHelper_1.sendNotFound)(res, "Gender not found");
        if (code) {
            const formattedCode = code.toUpperCase();
            const existing = await prisma_1.prisma.gender.findFirst({ where: { code: formattedCode, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Gender code already exists");
        }
        if (name) {
            const existing = await prisma_1.prisma.gender.findFirst({ where: { name, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Gender name already exists");
        }
        const updated = await prisma_1.prisma.gender.update({
            where: { id },
            data: { code: code ? code.toUpperCase() : gender.code, name: name ?? gender.name, isActive: isActive ?? gender.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Gender updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateGender = updateGender;
const deleteGender = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Gender ID is required");
        const gender = await prisma_1.prisma.gender.findUnique({ where: { id } });
        if (!gender)
            return (0, controllerHelper_1.sendNotFound)(res, "Gender not found");
        await prisma_1.prisma.gender.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Gender deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteGender = deleteGender;
