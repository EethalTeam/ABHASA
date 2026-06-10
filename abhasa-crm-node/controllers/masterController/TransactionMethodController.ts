import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createTransactionMethod = async (req: Request, res: Response) => {
  try {
    const { code, name, description, isActive } = req.body;
    if (!code || !name) return sendBadRequest(res, "Code and name are required");
    const formattedCode = code.toUpperCase();
    const existing = await prisma.transactionMethod.findFirst({ where: { code: formattedCode } });
    if (existing) return sendBadRequest(res, "Transaction method code already exists");
    const method = await prisma.transactionMethod.create({ data: { code: formattedCode, name, description, isActive } });
    return sendCreated(res, "Transaction method created successfully", method);
  } catch (error) { return sendServerError(res, error); }
};

const getAllTransactionMethods = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const methods = await prisma.transactionMethod.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Transaction methods retrieved successfully", methods);
  } catch (error) { return sendServerError(res, error); }
};

const getTransactionMethodById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction method ID is required");
    const method = await prisma.transactionMethod.findUnique({ where: { id } });
    if (!method) return sendNotFound(res, "Transaction method not found");
    return sendSuccess(res, "Transaction method retrieved successfully", method);
  } catch (error) { return sendServerError(res, error); }
};

const updateTransactionMethod = async (req: Request, res: Response) => {
  try {
    const { id, code, name, description, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Transaction method ID is required");
    const method = await prisma.transactionMethod.findUnique({ where: { id } });
    if (!method) return sendNotFound(res, "Transaction method not found");
    if (code) {
      const formattedCode = code.toUpperCase();
      const existing = await prisma.transactionMethod.findFirst({ where: { code: formattedCode, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Transaction method code already exists");
    }
    const updated = await prisma.transactionMethod.update({
      where: { id },
      data: { code: code ? code.toUpperCase() : method.code, name: name ?? method.name, description: description ?? method.description, isActive: isActive ?? method.isActive },
    });
    return sendSuccess(res, "Transaction method updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteTransactionMethod = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Transaction method ID is required");
    const method = await prisma.transactionMethod.findUnique({ where: { id } });
    if (!method) return sendNotFound(res, "Transaction method not found");
    await prisma.transactionMethod.delete({ where: { id } });
    return sendSuccess(res, "Transaction method deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createTransactionMethod, getAllTransactionMethods, getTransactionMethodById, updateTransactionMethod, deleteTransactionMethod };
