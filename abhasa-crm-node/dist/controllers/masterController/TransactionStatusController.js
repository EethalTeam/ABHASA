"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionStatus = exports.updateTransactionStatus = exports.getTransactionStatusById = exports.getAllTransactionStatuses = exports.createTransactionStatus = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createTransactionStatus = async (req, res) => {
    try {
        const { code, name, isActive } = req.body;
        if (!code || !name)
            return (0, controllerHelper_1.sendBadRequest)(res, "Code and name are required");
        const formattedCode = code.toUpperCase();
        const existing = await prisma_1.prisma.transactionStatusMaster.findFirst({ where: { code: formattedCode } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction status code already exists");
        const status = await prisma_1.prisma.transactionStatusMaster.create({ data: { code: formattedCode, name, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Transaction status created successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createTransactionStatus = createTransactionStatus;
const getAllTransactionStatuses = async (req, res) => {
    try {
        const { isActive } = req.query;
        const statuses = await prisma_1.prisma.transactionStatusMaster.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction statuses retrieved successfully", statuses);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllTransactionStatuses = getAllTransactionStatuses;
const getTransactionStatusById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction status ID is required");
        const status = await prisma_1.prisma.transactionStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction status not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction status retrieved successfully", status);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getTransactionStatusById = getTransactionStatusById;
const updateTransactionStatus = async (req, res) => {
    try {
        const { id, code, name, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction status ID is required");
        const status = await prisma_1.prisma.transactionStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction status not found");
        if (code) {
            const formattedCode = code.toUpperCase();
            const existing = await prisma_1.prisma.transactionStatusMaster.findFirst({ where: { code: formattedCode, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Transaction status code already exists");
        }
        const updated = await prisma_1.prisma.transactionStatusMaster.update({
            where: { id },
            data: { code: code ? code.toUpperCase() : status.code, name: name ?? status.name, isActive: isActive ?? status.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction status updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateTransactionStatus = updateTransactionStatus;
const deleteTransactionStatus = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction status ID is required");
        const status = await prisma_1.prisma.transactionStatusMaster.findUnique({ where: { id } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction status not found");
        await prisma_1.prisma.transactionStatusMaster.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction status deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteTransactionStatus = deleteTransactionStatus;
