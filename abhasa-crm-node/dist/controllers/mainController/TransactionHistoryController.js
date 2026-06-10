"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionHistory = exports.updateTransactionHistory = exports.getTransactionHistoryById = exports.getAllTransactionHistories = exports.createTransactionHistory = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createTransactionHistory = async (req, res) => {
    try {
        const { transactionId, fromStatusId, toStatusId, reason, changedBy } = req.body;
        if (!transactionId || !toStatusId)
            return (0, controllerHelper_1.sendBadRequest)(res, "transactionId and toStatusId are required");
        const transaction = await prisma_1.prisma.transaction.findUnique({ where: { id: transactionId } });
        if (!transaction)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction not found");
        if (fromStatusId) {
            const from = await prisma_1.prisma.transactionStatusMaster.findUnique({ where: { id: fromStatusId } });
            if (!from)
                return (0, controllerHelper_1.sendNotFound)(res, "From transaction status not found");
        }
        const to = await prisma_1.prisma.transactionStatusMaster.findUnique({ where: { id: toStatusId } });
        if (!to)
            return (0, controllerHelper_1.sendNotFound)(res, "To transaction status not found");
        const history = await prisma_1.prisma.transactionHistory.create({ data: { transactionId, fromStatusId, toStatusId, reason, changedBy } });
        return (0, controllerHelper_1.sendCreated)(res, "Transaction history created successfully", history);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createTransactionHistory = createTransactionHistory;
const getAllTransactionHistories = async (req, res) => {
    try {
        const histories = await prisma_1.prisma.transactionHistory.findMany({
            include: { transaction: { select: { id: true, referenceId: true, type: true, amount: true } } },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction histories retrieved successfully", histories);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllTransactionHistories = getAllTransactionHistories;
const getTransactionHistoryById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction history ID is required");
        const history = await prisma_1.prisma.transactionHistory.findUnique({
            where: { id },
            include: { transaction: { select: { id: true, referenceId: true, type: true, amount: true } } },
        });
        if (!history)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction history not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction history retrieved successfully", history);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getTransactionHistoryById = getTransactionHistoryById;
const updateTransactionHistory = async (req, res) => {
    try {
        const { id, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction history ID is required");
        const history = await prisma_1.prisma.transactionHistory.findUnique({ where: { id } });
        if (!history)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction history not found");
        const updated = await prisma_1.prisma.transactionHistory.update({ where: { id }, data: rest });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction history updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateTransactionHistory = updateTransactionHistory;
const deleteTransactionHistory = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction history ID is required");
        const history = await prisma_1.prisma.transactionHistory.findUnique({ where: { id } });
        if (!history)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction history not found");
        await prisma_1.prisma.transactionHistory.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction history deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteTransactionHistory = deleteTransactionHistory;
