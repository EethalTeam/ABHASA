import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { referenceId, type, statusId, methodId, amount, currency, createdBy } = req.body;
    if (!referenceId || !type || !statusId || !methodId || !amount) return sendBadRequest(res, "referenceId, type, statusId, methodId and amount are required");
    const status = await prisma.transactionStatusMaster.findUnique({ where: { id: statusId } }); if (!status) return sendNotFound(res, "Transaction status not found");
    const method = await prisma.transactionMethod.findUnique({ where: { id: methodId } }); if (!method) return sendNotFound(res, "Transaction method not found");
    const transaction = await prisma.transaction.create({ data: { referenceId, type, statusId, methodId, amount, currency, createdBy } });
    return sendCreated(res, "Transaction created successfully", transaction);
  } catch (error) { return sendServerError(res, error); }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        status: { select: { id: true, code: true, name: true } },
        method: { select: { id: true, code: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Transactions retrieved successfully", transactions);
  } catch (error) { return sendServerError(res, error); }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction ID is required");
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        status: { select: { id: true, code: true, name: true } },
        method: { select: { id: true, code: true, name: true } },
      },
    });
    if (!transaction) return sendNotFound(res, "Transaction not found");
    return sendSuccess(res, "Transaction retrieved successfully", transaction);
  } catch (error) { return sendServerError(res, error); }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id, statusId, methodId, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Transaction ID is required");
    const transaction = await prisma.transaction.findUnique({ where: { id } }); if (!transaction) return sendNotFound(res, "Transaction not found");
    if (statusId) { const status = await prisma.transactionStatusMaster.findUnique({ where: { id: statusId } }); if (!status) return sendNotFound(res, "Transaction status not found"); }
    if (methodId) { const method = await prisma.transactionMethod.findUnique({ where: { id: methodId } }); if (!method) return sendNotFound(res, "Transaction method not found"); }
    const updated = await prisma.transaction.update({ where: { id }, data: { statusId: statusId ?? transaction.statusId, methodId: methodId ?? transaction.methodId, ...rest } });
    return sendSuccess(res, "Transaction updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction ID is required");
    const transaction = await prisma.transaction.findUnique({ where: { id } }); if (!transaction) return sendNotFound(res, "Transaction not found");
    await prisma.transaction.delete({ where: { id } });
    return sendSuccess(res, "Transaction deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};
