import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createPatientStatus = async (req: Request, res: Response) => {
  try {
    const { code, name, description, isActive } = req.body;
    if (!code || !name) return sendBadRequest(res, "Code and name are required");
    const existing = await prisma.patientStatusMaster.findFirst({ where: { code } });
    if (existing) return sendBadRequest(res, "Patient status code already exists");
    const status = await prisma.patientStatusMaster.create({ data: { code, name, description, isActive } });
    return sendCreated(res, "Patient status created successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const getAllPatientStatuses = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const statuses = await prisma.patientStatusMaster.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Patient statuses retrieved successfully", statuses);
  } catch (error) { return sendServerError(res, error); }
};

const getPatientStatusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Patient status ID is required");
    const status = await prisma.patientStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Patient status not found");
    return sendSuccess(res, "Patient status retrieved successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const updatePatientStatus = async (req: Request, res: Response) => {
  try {
    const { id, code, name, description, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Patient status ID is required");
    const status = await prisma.patientStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Patient status not found");
    if (code && code !== status.code) {
      const existing = await prisma.patientStatusMaster.findFirst({ where: { code, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Patient status code already exists");
    }
    const updated = await prisma.patientStatusMaster.update({
      where: { id },
      data: { code: code ?? status.code, name: name ?? status.name, description: description ?? status.description, isActive: isActive ?? status.isActive },
    });
    return sendSuccess(res, "Patient status updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deletePatientStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Patient status ID is required");
    const status = await prisma.patientStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Patient status not found");
    await prisma.patientStatusMaster.delete({ where: { id } });
    return sendSuccess(res, "Patient status deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createPatientStatus, getAllPatientStatuses, getPatientStatusById, updatePatientStatus, deletePatientStatus };
