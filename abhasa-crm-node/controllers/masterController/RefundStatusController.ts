import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createRefundStatus = async (req: Request, res: Response) => {
  try {
    const { code, name, description, color, isActive } = req.body;
    if (!code || !name) return sendBadRequest(res, "Code and name are required");
    const formattedCode = code.toUpperCase();
    const existing = await prisma.refundStatus.findFirst({ where: { code: formattedCode } });
    if (existing) return sendBadRequest(res, "Refund status code already exists");
    const refundStatus = await prisma.refundStatus.create({
      data: { code: formattedCode, name, description, color, isActive },
    });
    return sendCreated(res, "Refund status created successfully", refundStatus);
  } catch (error) { return sendServerError(res, error); }
};

const getAllRefundStatuses = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const statuses = await prisma.refundStatus.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Refund statuses retrieved successfully", statuses);
  } catch (error) { return sendServerError(res, error); }
};

const getRefundStatusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Refund status ID is required");
    const refundStatus = await prisma.refundStatus.findUnique({ where: { id } });
    if (!refundStatus) return sendNotFound(res, "Refund status not found");
    return sendSuccess(res, "Refund status retrieved successfully", refundStatus);
  } catch (error) { return sendServerError(res, error); }
};

const updateRefundStatus = async (req: Request, res: Response) => {
  try {
    const { id, code, name, description, color, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Refund status ID is required");
    const refundStatus = await prisma.refundStatus.findUnique({ where: { id } });
    if (!refundStatus) return sendNotFound(res, "Refund status not found");
    if (code) {
      const formattedCode = code.toUpperCase();
      const existing = await prisma.refundStatus.findFirst({ where: { code: formattedCode, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Refund status code already exists");
    }
    const updated = await prisma.refundStatus.update({
      where: { id },
      data: {
        code: code ? code.toUpperCase() : refundStatus.code,
        name: name ?? refundStatus.name,
        description: description ?? refundStatus.description,
        color: color ?? refundStatus.color,
        isActive: isActive ?? refundStatus.isActive,
      },
    });
    return sendSuccess(res, "Refund status updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteRefundStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Refund status ID is required");
    const refundStatus = await prisma.refundStatus.findUnique({ where: { id } });
    if (!refundStatus) return sendNotFound(res, "Refund status not found");
    await prisma.refundStatus.delete({ where: { id } });
    return sendSuccess(res, "Refund status deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createRefundStatus, getAllRefundStatuses, getRefundStatusById, updateRefundStatus, deleteRefundStatus };
