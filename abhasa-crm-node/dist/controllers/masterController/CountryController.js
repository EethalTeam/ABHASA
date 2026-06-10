"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.getCountryById = exports.getAllCountries = exports.createCountry = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createCountry = async (req, res) => {
    try {
        const { name, code, phoneCode, isActive } = req.body;
        if (!name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Country name is required");
        const existingName = await prisma_1.prisma.country.findFirst({ where: { name } });
        if (existingName)
            return (0, controllerHelper_1.sendBadRequest)(res, "Country already exists");
        if (code) {
            const existingCode = await prisma_1.prisma.country.findFirst({ where: { code } });
            if (existingCode)
                return (0, controllerHelper_1.sendBadRequest)(res, "Country code already exists");
        }
        const country = await prisma_1.prisma.country.create({ data: { name, code, phoneCode, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Country created successfully", country);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createCountry = createCountry;
const getAllCountries = async (req, res) => {
    try {
        const { isActive } = req.query;
        const countries = await prisma_1.prisma.country.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Countries fetched successfully", countries);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllCountries = getAllCountries;
const getCountryById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "ID is required");
        const country = await prisma_1.prisma.country.findUnique({ where: { id } });
        if (!country)
            return (0, controllerHelper_1.sendNotFound)(res, "Country not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Country fetched successfully", country);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getCountryById = getCountryById;
const updateCountry = async (req, res) => {
    try {
        const { id, name, code, phoneCode, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "ID is required");
        const country = await prisma_1.prisma.country.findUnique({ where: { id } });
        if (!country)
            return (0, controllerHelper_1.sendNotFound)(res, "Country not found");
        if (name && name !== country.name) {
            const existing = await prisma_1.prisma.country.findFirst({ where: { name, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Country already exists");
        }
        if (code && code !== country.code) {
            const existing = await prisma_1.prisma.country.findFirst({ where: { code, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Country code already exists");
        }
        const updated = await prisma_1.prisma.country.update({
            where: { id },
            data: { name: name ?? country.name, code: code ?? country.code, phoneCode: phoneCode ?? country.phoneCode, isActive: isActive ?? country.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Country updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "ID is required");
        const country = await prisma_1.prisma.country.findUnique({ where: { id } });
        if (!country)
            return (0, controllerHelper_1.sendNotFound)(res, "Country not found");
        await prisma_1.prisma.country.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Country deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteCountry = deleteCountry;
