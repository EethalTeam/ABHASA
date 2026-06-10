import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createConsultationHistory = async (req: Request, res: Response) => {
  try {
    const { leadId, psychologistId, bdmId, patientName, callerName, serviceInterested, consultationDate, status, recommendations, patientAssessment, averageRating, sessionNotes, feedbackHistory, consultationStartedAt, consultationEndedAt } = req.body;
    if (!leadId || !psychologistId || !patientName || !serviceInterested || !consultationDate) return sendBadRequest(res, "leadId, psychologistId, patientName, serviceInterested and consultationDate are required");
    if (averageRating !== undefined && (averageRating < 0 || averageRating > 5)) return sendBadRequest(res, "Rating must be between 0 and 5");
    const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found");
    const psych = await prisma.psychologist.findUnique({ where: { id: psychologistId } }); if (!psych) return sendNotFound(res, "Psychologist not found");
    let sessionDurationInSeconds = 0;
    if (consultationStartedAt && consultationEndedAt) {
      sessionDurationInSeconds = Math.floor((new Date(consultationEndedAt).getTime() - new Date(consultationStartedAt).getTime()) / 1000);
    }
    const history = await prisma.consultationHistory.create({ data: { leadId, psychologistId, bdmId, patientName, callerName, serviceInterested, consultationDate, status, recommendations, patientAssessment, averageRating, sessionNotes, feedbackHistory, consultationStartedAt, consultationEndedAt, sessionDurationInSeconds } });
    return sendCreated(res, "Consultation history created successfully", history);
  } catch (error) { return sendServerError(res, error); }
};

const getAllConsultationHistory = async (req: Request, res: Response) => {
  try {
    const histories = await prisma.consultationHistory.findMany({
      include: {
        lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
        psychologist: { select: { id: true, name: true, specialization: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Consultation history retrieved successfully", histories);
  } catch (error) { return sendServerError(res, error); }
};

const getConsultationHistoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Consultation history ID is required");
    const history = await prisma.consultationHistory.findUnique({
      where: { id },
      include: {
        lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
        psychologist: { select: { id: true, name: true, specialization: true } },
      },
    });
    if (!history) return sendNotFound(res, "Consultation history not found");
    return sendSuccess(res, "Consultation history retrieved successfully", history);
  } catch (error) { return sendServerError(res, error); }
};

const updateConsultationHistory = async (req: Request, res: Response) => {
  try {
    const { id, leadId, psychologistId, averageRating, consultationStartedAt, consultationEndedAt, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Consultation history ID is required");
    const history = await prisma.consultationHistory.findUnique({ where: { id } }); if (!history) return sendNotFound(res, "Consultation history not found");
    if (averageRating !== undefined && (averageRating < 0 || averageRating > 5)) return sendBadRequest(res, "Rating must be between 0 and 5");
    if (leadId) { const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found"); }
    if (psychologistId) { const psych = await prisma.psychologist.findUnique({ where: { id: psychologistId } }); if (!psych) return sendNotFound(res, "Psychologist not found"); }
    let sessionDurationInSeconds = history.sessionDurationInSeconds;
    if (consultationStartedAt && consultationEndedAt) {
      sessionDurationInSeconds = Math.floor((new Date(consultationEndedAt).getTime() - new Date(consultationStartedAt).getTime()) / 1000);
    }
    const updated = await prisma.consultationHistory.update({ where: { id }, data: { leadId: leadId ?? history.leadId, psychologistId: psychologistId ?? history.psychologistId, averageRating: averageRating ?? history.averageRating, consultationStartedAt: consultationStartedAt ?? history.consultationStartedAt, consultationEndedAt: consultationEndedAt ?? history.consultationEndedAt, sessionDurationInSeconds, ...rest } });
    return sendSuccess(res, "Consultation history updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteConsultationHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Consultation history ID is required");
    const history = await prisma.consultationHistory.findUnique({ where: { id } }); if (!history) return sendNotFound(res, "Consultation history not found");
    await prisma.consultationHistory.delete({ where: { id } });
    return sendSuccess(res, "Consultation history deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createConsultationHistory, getAllConsultationHistory, getConsultationHistoryById, updateConsultationHistory, deleteConsultationHistory };
