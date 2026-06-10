"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionMethod = exports.updateTransactionMethod = exports.getTransactionMethodById = exports.getAllTransactionMethods = exports.createTransactionMethod = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createTransactionMethod = async (req, res) => {
    try {
        const { code, name, description, isActive } = req.body;
        if (!code || !name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Code and name are required");
        const formattedCode = code.toUpperCase();
        const existing = await prisma_1.prisma.transactionMethod.findFirst({ where: { code: formattedCode } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction method code already exists");
        const method = await prisma_1.prisma.transactionMethod.create({ data: { code: formattedCode, name, description, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Transaction method created successfully", method);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createTransactionMethod = createTransactionMethod;
const getAllTransactionMethods = async (req, res) => {
    try {
        const { isActive } = req.query;
        const methods = await prisma_1.prisma.transactionMethod.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction methods retrieved successfully", methods);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllTransactionMethods = getAllTransactionMethods;
const getTransactionMethodById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction method ID is required");
        const method = await prisma_1.prisma.transactionMethod.findUnique({ where: { id } });
        if (!method)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction method not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction method retrieved successfully", method);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getTransactionMethodById = getTransactionMethodById;
const updateTransactionMethod = async (req, res) => {
    try {
        const { id, code, name, description, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction method ID is required");
        const method = await prisma_1.prisma.transactionMethod.findUnique({ where: { id } });
        if (!method)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction method not found");
        if (code) {
            const formattedCode = code.toUpperCase();
            const existing = await prisma_1.prisma.transactionMethod.findFirst({ where: { code: formattedCode, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Transaction method code already exists");
        }
        const updated = await prisma_1.prisma.transactionMethod.update({
            where: { id },
            data: { code: code ? code.toUpperCase() : method.code, name: name ?? method.name, description: description ?? method.description, isActive: isActive ?? method.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction method updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateTransactionMethod = updateTransactionMethod;
const deleteTransactionMethod = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction method ID is required");
        const method = await prisma_1.prisma.transactionMethod.findUnique({ where: { id } });
        if (!method)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction method not found");
        await prisma_1.prisma.transactionMethod.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction method deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteTransactionMethod = deleteTransactionMethod;
