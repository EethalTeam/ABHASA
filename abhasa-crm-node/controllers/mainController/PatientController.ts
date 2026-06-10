import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createPatient = async (req: Request, res: Response) => {
  try {
    const { patientName, callerName, relationship, phone, email, city, consultationStatus, paymentStatus, psychologistAssigned, assignedBDM, lastConsultation } = req.body;
    if (!patientName || !callerName || !phone) return sendBadRequest(res, "patientName, callerName and phone are required");
    const existing = await prisma.patient.findFirst({ where: { phone } });
    if (existing) return sendBadRequest(res, "Patient already exists with this phone number");
    const patient = await prisma.patient.create({ data: { patientName, callerName, relationship, phone, email, city, consultationStatus, paymentStatus, psychologistAssigned, assignedBDM, lastConsultation } });
    return sendCreated(res, "Patient created successfully", patient);
  } catch (error) { return sendServerError(res, error); }
};

const getAllPatients = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const patients = await prisma.patient.findMany({ orderBy: { createdAt: "desc" } });
    return sendSuccess(res, "Patients retrieved successfully", patients);
  } catch (error) { return sendServerError(res, error); }
};

const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Patient ID is required");
    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) return sendNotFound(res, "Patient not found");
    return sendSuccess(res, "Patient retrieved successfully", patient);
  } catch (error) { return sendServerError(res, error); }
};

const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id, phone, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Patient ID is required");
    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) return sendNotFound(res, "Patient not found");
    if (phone && phone !== patient.phone) {
      const existing = await prisma.patient.findFirst({ where: { phone, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Phone number already exists");
    }
    const updated = await prisma.patient.update({ where: { id }, data: { phone: phone ?? patient.phone, ...rest } });
    return sendSuccess(res, "Patient updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deletePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Patient ID is required");
    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) return sendNotFound(res, "Patient not found");
    await prisma.patient.delete({ where: { id } });
    return sendSuccess(res, "Patient deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient };
