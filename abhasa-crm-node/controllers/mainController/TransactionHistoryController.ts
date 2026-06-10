import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createTransactionHistory = async (req: Request, res: Response) => {
  try {
    const { transactionId, fromStatusId, toStatusId, reason, changedBy } = req.body;
    if (!transactionId || !toStatusId) return sendBadRequest(res, "transactionId and toStatusId are required");
    const transaction = await prisma.transaction.findUnique({ where: { id: transactionId } }); if (!transaction) return sendNotFound(res, "Transaction not found");
    if (fromStatusId) { const from = await prisma.transactionStatusMaster.findUnique({ where: { id: fromStatusId } }); if (!from) return sendNotFound(res, "From transaction status not found"); }
    const to = await prisma.transactionStatusMaster.findUnique({ where: { id: toStatusId } }); if (!to) return sendNotFound(res, "To transaction status not found");
    const history = await prisma.transactionHistory.create({ data: { transactionId, fromStatusId, toStatusId, reason, changedBy } });
    return sendCreated(res, "Transaction history created successfully", history);
  } catch (error) { return sendServerError(res, error); }
};

const getAllTransactionHistories = async (req: Request, res: Response) => {
  try {
    const histories = await prisma.transactionHistory.findMany({
      include: { transaction: { select: { id: true, referenceId: true, type: true, amount: true } } },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Transaction histories retrieved successfully", histories);
  } catch (error) { return sendServerError(res, error); }
};

const getTransactionHistoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction history ID is required");
    const history = await prisma.transactionHistory.findUnique({
      where: { id },
      include: { transaction: { select: { id: true, referenceId: true, type: true, amount: true } } },
    });
    if (!history) return sendNotFound(res, "Transaction history not found");
    return sendSuccess(res, "Transaction history retrieved successfully", history);
  } catch (error) { return sendServerError(res, error); }
};

const updateTransactionHistory = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Transaction history ID is required");
    const history = await prisma.transactionHistory.findUnique({ where: { id } }); if (!history) return sendNotFound(res, "Transaction history not found");
    const updated = await prisma.transactionHistory.update({ where: { id }, data: rest });
    return sendSuccess(res, "Transaction history updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteTransactionHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction history ID is required");
    const history = await prisma.transactionHistory.findUnique({ where: { id } }); if (!history) return sendNotFound(res, "Transaction history not found");
    await prisma.transactionHistory.delete({ where: { id } });
    return sendSuccess(res, "Transaction history deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createTransactionHistory, getAllTransactionHistories, getTransactionHistoryById, updateTransactionHistory, deleteTransactionHistory };
