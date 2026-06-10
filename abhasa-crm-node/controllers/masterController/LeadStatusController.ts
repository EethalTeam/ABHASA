import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createStatus = async (req: Request, res: Response) => {
  try {
    const { name, color, description, isActive } = req.body;
    if (!name) return sendBadRequest(res, "Status name is required");
    const existing = await prisma.status.findFirst({ where: { name } });
    if (existing) return sendBadRequest(res, "Status already exists");
    const status = await prisma.status.create({ data: { name, color, description, isActive } });
    return sendCreated(res, "Status created successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const getAllStatuses = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const statuses = await prisma.status.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Statuses retrieved successfully", statuses);
  } catch (error) { return sendServerError(res, error); }
};

const getStatusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Status ID is required");
    const status = await prisma.status.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Status not found");
    return sendSuccess(res, "Status retrieved successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id, name, color, description, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Status ID is required");
    const status = await prisma.status.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Status not found");
    if (name && name !== status.name) {
      const existing = await prisma.status.findFirst({ where: { name, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Status already exists");
    }
    const updated = await prisma.status.update({
      where: { id },
      data: { name: name ?? status.name, color: color ?? status.color, description: description ?? status.description, isActive: isActive ?? status.isActive },
    });
    return sendSuccess(res, "Status updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Status ID is required");
    const status = await prisma.status.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Status not found");
    await prisma.status.delete({ where: { id } });
    return sendSuccess(res, "Status deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createStatus, getAllStatuses, getStatusById, updateStatus, deleteStatus };
