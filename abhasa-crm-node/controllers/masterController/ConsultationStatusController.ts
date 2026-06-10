import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createConsultationStatus = async (req: Request, res: Response) => {
  try {
    const { code, name, description, isActive } = req.body;
    if (!code || !name) return sendBadRequest(res, "Code and name are required");
    const formattedCode = code.toUpperCase();
    const existing = await prisma.consultationStatusMaster.findFirst({ where: { code: formattedCode } });
    if (existing) return sendBadRequest(res, "Consultation status code already exists");
    const status = await prisma.consultationStatusMaster.create({ data: { code: formattedCode, name, description, isActive } });
    return sendCreated(res, "Consultation status created successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const getAllConsultationStatuses = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const statuses = await prisma.consultationStatusMaster.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Consultation statuses fetched successfully", statuses);
  } catch (error) { return sendServerError(res, error); }
};

const getConsultationStatusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "ID is required");
    const status = await prisma.consultationStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Consultation status not found");
    return sendSuccess(res, "Consultation status fetched successfully", status);
  } catch (error) { return sendServerError(res, error); }
};

const updateConsultationStatus = async (req: Request, res: Response) => {
  try {
    const { id, code, name, description, isActive } = req.body;
    if (!id) return sendBadRequest(res, "ID is required");
    const status = await prisma.consultationStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Consultation status not found");
    if (code) {
      const formattedCode = code.toUpperCase();
      const existing = await prisma.consultationStatusMaster.findFirst({ where: { code: formattedCode, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Consultation status code already exists");
    }
    const updated = await prisma.consultationStatusMaster.update({
      where: { id },
      data: { code: code ? code.toUpperCase() : status.code, name: name ?? status.name, description: description ?? status.description, isActive: isActive ?? status.isActive },
    });
    return sendSuccess(res, "Consultation status updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteConsultationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "ID is required");
    const status = await prisma.consultationStatusMaster.findUnique({ where: { id } });
    if (!status) return sendNotFound(res, "Consultation status not found");
    await prisma.consultationStatusMaster.delete({ where: { id } });
    return sendSuccess(res, "Consultation status deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createConsultationStatus, getAllConsultationStatuses, getConsultationStatusById, updateConsultationStatus, deleteConsultationStatus };
