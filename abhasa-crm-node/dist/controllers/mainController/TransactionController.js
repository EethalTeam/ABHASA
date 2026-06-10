"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getAllTransactions = exports.createTransaction = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createTransaction = async (req, res) => {
    try {
        const { referenceId, type, statusId, methodId, amount, currency, createdBy } = req.body;
        if (!referenceId || !type || !statusId || !methodId || !amount)
            return (0, controllerHelper_1.sendBadRequest)(res, "referenceId, type, statusId, methodId and amount are required");
        const status = await prisma_1.prisma.transactionStatusMaster.findUnique({ where: { id: statusId } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction status not found");
        const method = await prisma_1.prisma.transactionMethod.findUnique({ where: { id: methodId } });
        if (!method)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction method not found");
        const transaction = await prisma_1.prisma.transaction.create({ data: { referenceId, type, statusId, methodId, amount, currency, createdBy } });
        return (0, controllerHelper_1.sendCreated)(res, "Transaction created successfully", transaction);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createTransaction = createTransaction;
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await prisma_1.prisma.transaction.findMany({
            include: {
                status: { select: { id: true, code: true, name: true } },
                method: { select: { id: true, code: true, name: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Transactions retrieved successfully", transactions);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllTransactions = getAllTransactions;
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction ID is required");
        const transaction = await prisma_1.prisma.transaction.findUnique({
            where: { id },
            include: {
                status: { select: { id: true, code: true, name: true } },
                method: { select: { id: true, code: true, name: true } },
            },
        });
        if (!transaction)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction retrieved successfully", transaction);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getTransactionById = getTransactionById;
const updateTransaction = async (req, res) => {
    try {
        const { id, statusId, methodId, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction ID is required");
        const transaction = await prisma_1.prisma.transaction.findUnique({ where: { id } });
        if (!transaction)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction not found");
        if (statusId) {
            const status = await prisma_1.prisma.transactionStatusMaster.findUnique({ where: { id: statusId } });
            if (!status)
                return (0, controllerHelper_1.sendNotFound)(res, "Transaction status not found");
        }
        if (methodId) {
            const method = await prisma_1.prisma.transactionMethod.findUnique({ where: { id: methodId } });
            if (!method)
                return (0, controllerHelper_1.sendNotFound)(res, "Transaction method not found");
        }
        const updated = await prisma_1.prisma.transaction.update({ where: { id }, data: { statusId: statusId ?? transaction.statusId, methodId: methodId ?? transaction.methodId, ...rest } });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Transaction ID is required");
        const transaction = await prisma_1.prisma.transaction.findUnique({ where: { id } });
        if (!transaction)
            return (0, controllerHelper_1.sendNotFound)(res, "Transaction not found");
        await prisma_1.prisma.transaction.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Transaction deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteTransaction = deleteTransaction;
