import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { code, name, isActive } = req.body;
    if (!code || !name) return sendBadRequest(res, "Code and name are required");
    const formattedCode = code.toUpperCase();
    const existing = await prisma.transactionStatusMaster.findFirst({ where: { code: formattedCode } });
    if (existing) return sendBadRequest(res, "Transaction status code already exists");
    const status = await prisma.transactionStatusMaster.create({ data: { code: formattedCode, name, isActive } });
    return sendCreated(res, "Transaction status created successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const getAllTransactionStatuses = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const statuses = await prisma.transactionStatusMaster.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Transaction statuses retrieved successfully", statuses);
  } catch (error) { return sendServerError(res, error); }
};

const getTransactionStatusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction status ID is required");
    const status = await prisma.transactionStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Transaction status not found");
    return sendSuccess(res, "Transaction status retrieved successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { id, code, name, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Transaction status ID is required");
    const status = await prisma.transactionStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Transaction status not found");
    if (code) {
      const formattedCode = code.toUpperCase();
      const existing = await prisma.transactionStatusMaster.findFirst({ where: { code: formattedCode, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Transaction status code already exists");
    }
    const updated = await prisma.transactionStatusMaster.update({
      where: { id },
      data: { code: code ? code.toUpperCase() : status.code, name: name ?? status.name, isActive: isActive ?? status.isActive },
    });
    return sendSuccess(res, "Transaction status updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction status ID is required");
    const status = await prisma.transactionStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Transaction status not found");
    await prisma.transactionStatusMaster.delete({ where: { id } });
    return sendSuccess(res, "Transaction status deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createTransactionStatus, getAllTransactionStatuses, getTransactionStatusById, updateTransactionStatus, deleteTransactionStatus };
