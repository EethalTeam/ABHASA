import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

export const createConsultation = async (req: Request, res: Response) => {
  try {
    const { leadId, psychId, serviceTypeId, datetime, status, cancellationReason, rescheduledFrom, refundInitiated, refundLink, bookedBy, updatedBy } = req.body;
    if (!leadId || !psychId || !serviceTypeId || !datetime) return sendBadRequest(res, "leadId, psychId, serviceTypeId and datetime are required");
    if (isNaN(new Date(datetime).getTime())) return sendBadRequest(res, "Invalid consultation datetime");
    const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found");
    const psych = await prisma.psychologist.findUnique({ where: { id: psychId } }); if (!psych) return sendNotFound(res, "Psychologist not found");
    const service = await prisma.serviceType.findUnique({ where: { id: serviceTypeId } }); if (!service) return sendNotFound(res, "Service Type not found");
    if (rescheduledFrom) { const old = await prisma.consultation.findUnique({ where: { id: rescheduledFrom } }); if (!old) return sendNotFound(res, "Rescheduled consultation not found"); }
    const consultation = await prisma.consultation.create({ data: { leadId, psychId, serviceTypeId, datetime, status, cancellationReason, rescheduledFrom, refundInitiated, refundLink, bookedBy, updatedBy } });
    return sendCreated(res, "Consultation created successfully", consultation);
  } catch (error) { return sendServerError(res, error); }
};

export const getAllConsultations = async (req: Request, res: Response) => {
  try {
    const consultations = await prisma.consultation.findMany({
      include: {
        lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
        psychologist: { select: { id: true, name: true, specialization: true } },
        serviceType: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Consultations retrieved successfully", consultations);
  } catch (error) { return sendServerError(res, error); }
};

export const getConsultationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Consultation ID is required");
    const consultation = await prisma.consultation.findUnique({
      where: { id },
      include: {
        lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
        psychologist: { select: { id: true, name: true, specialization: true } },
        serviceType: { select: { id: true, name: true } },
      },
    });
    if (!consultation) return sendNotFound(res, "Consultation not found");
    return sendSuccess(res, "Consultation retrieved successfully", consultation);
  } catch (error) { return sendServerError(res, error); }
};

export const updateConsultation = async (req: Request, res: Response) => {
  try {
    const { id, leadId, psychId, serviceTypeId, datetime, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Consultation ID is required");
    const consultation = await prisma.consultation.findUnique({ where: { id } }); if (!consultation) return sendNotFound(res, "Consultation not found");
    if (datetime && isNaN(new Date(datetime).getTime())) return sendBadRequest(res, "Invalid consultation datetime");
    if (leadId) { const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found"); }
    if (psychId) { const psych = await prisma.psychologist.findUnique({ where: { id: psychId } }); if (!psych) return sendNotFound(res, "Psychologist not found"); }
    if (serviceTypeId) { const service = await prisma.serviceType.findUnique({ where: { id: serviceTypeId } }); if (!service) return sendNotFound(res, "Service Type not found"); }
    const updated = await prisma.consultation.update({ where: { id }, data: { leadId: leadId ?? consultation.leadId, psychId: psychId ?? consultation.psychId, serviceTypeId: serviceTypeId ?? consultation.serviceTypeId, datetime: datetime ?? consultation.datetime, ...rest } });
    return sendSuccess(res, "Consultation updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

export const deleteConsultation = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Consultation ID is required");
    const consultation = await prisma.consultation.findUnique({ where: { id } }); if (!consultation) return sendNotFound(res, "Consultation not found");
    await prisma.consultation.delete({ where: { id } });
    return sendSuccess(res, "Consultation deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};
