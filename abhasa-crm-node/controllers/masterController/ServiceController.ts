import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createServiceType = async (req: Request, res: Response) => {
  try {
    const { name, code, description, isActive } = req.body;
    if (!name) return sendBadRequest(res, "Service type name is required");
    const existingName = await prisma.serviceType.findFirst({ where: { name } });
    if (existingName) return sendBadRequest(res, "Service type already exists");
    if (code) {
      const existingCode = await prisma.serviceType.findFirst({ where: { code: code.toUpperCase() } });
      if (existingCode) return sendBadRequest(res, "Service type code already exists");
    }
    const serviceType = await prisma.serviceType.create({ data: { name, code: code ? code.toUpperCase() : null, description, isActive } });
    return sendCreated(res, "Service type created successfully", serviceType);
  } catch (error) { return sendServerError(res, error); }
};

const getAllServiceTypes = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const serviceTypes = await prisma.serviceType.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Service types retrieved successfully", serviceTypes);
  } catch (error) { return sendServerError(res, error); }
};

const getServiceTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Service type ID is required");
    const serviceType = await prisma.serviceType.findUnique({ where: { id } });
    if (!serviceType) return sendNotFound(res, "Service type not found");
    return sendSuccess(res, "Service type retrieved successfully", serviceType);
  } catch (error) { return sendServerError(res, error); }
};

const updateServiceType = async (req: Request, res: Response) => {
  try {
    const { id, name, code, description, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Service type ID is required");
    const serviceType = await prisma.serviceType.findUnique({ where: { id } });
    if (!serviceType) return sendNotFound(res, "Service type not found");
    if (name && name !== serviceType.name) {
      const existing = await prisma.serviceType.findFirst({ where: { name, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Service type already exists");
    }
    if (code) {
      const existing = await prisma.serviceType.findFirst({ where: { code: code.toUpperCase(), NOT: { id } } });
      if (existing) return sendBadRequest(res, "Service type code already exists");
    }
    const updated = await prisma.serviceType.update({
      where: { id },
      data: { name: name ?? serviceType.name, code: code ? code.toUpperCase() : serviceType.code, description: description ?? serviceType.description, isActive: isActive ?? serviceType.isActive },
    });
    return sendSuccess(res, "Service type updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteServiceType = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Service type ID is required");
    const serviceType = await prisma.serviceType.findUnique({ where: { id } });
    if (!serviceType) return sendNotFound(res, "Service type not found");
    await prisma.serviceType.delete({ where: { id } });
    return sendSuccess(res, "Service type deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createServiceType, getAllServiceTypes, getServiceTypeById, updateServiceType, deleteServiceType };
