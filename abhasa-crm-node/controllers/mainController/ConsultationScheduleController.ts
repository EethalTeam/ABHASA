import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createConsultationSchedule = async (req: Request, res: Response) => {
  try {
    const { leadId, psychologistId, datetime, status, createdBy, updatedBy } = req.body;
    if (!leadId || !psychologistId || !datetime) return sendBadRequest(res, "leadId, psychologistId and datetime are required");
    if (isNaN(new Date(datetime).getTime())) return sendBadRequest(res, "Invalid consultation datetime");
    const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found");
    const psych = await prisma.user.findUnique({ where: { id: psychologistId } }); if (!psych) return sendNotFound(res, "Psychologist not found");
    const existing = await prisma.consultationSchedule.findFirst({ where: { psychologistId, datetime: new Date(datetime), status: "Scheduled" } });
    if (existing) return sendBadRequest(res, "Psychologist already has a consultation scheduled at this time");
    const schedule = await prisma.consultationSchedule.create({ data: { leadId, psychologistId, datetime, status, createdBy, updatedBy } });
    return sendCreated(res, "Consultation scheduled successfully", schedule);
  } catch (error) { return sendServerError(res, error); }
};

const getAllConsultationSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await prisma.consultationSchedule.findMany({
      include: {
        lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
        psychologist: { select: { id: true, name: true } },
      },
      orderBy: { datetime: "asc" },
    });
    return sendSuccess(res, "Consultation schedules retrieved successfully", schedules);
  } catch (error) { return sendServerError(res, error); }
};

const getConsultationScheduleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Consultation schedule ID is required");
    const schedule = await prisma.consultationSchedule.findUnique({
      where: { id },
      include: {
        lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
        psychologist: { select: { id: true, name: true } },
      },
    });
    if (!schedule) return sendNotFound(res, "Consultation schedule not found");
    return sendSuccess(res, "Consultation schedule retrieved successfully", schedule);
  } catch (error) { return sendServerError(res, error); }
};

const updateConsultationSchedule = async (req: Request, res: Response) => {
  try {
    const { id, leadId, psychologistId, datetime, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Consultation schedule ID is required");
    const schedule = await prisma.consultationSchedule.findUnique({ where: { id } }); if (!schedule) return sendNotFound(res, "Consultation schedule not found");
    if (datetime && isNaN(new Date(datetime).getTime())) return sendBadRequest(res, "Invalid consultation datetime");
    if (leadId) { const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found"); }
    if (psychologistId) { const psych = await prisma.user.findUnique({ where: { id: psychologistId } }); if (!psych) return sendNotFound(res, "Psychologist not found"); }
    const updatedPsychId = psychologistId ?? schedule.psychologistId;
    const updatedDatetime = datetime ? new Date(datetime) : schedule.datetime;
    const existing = await prisma.consultationSchedule.findFirst({ where: { psychologistId: updatedPsychId, datetime: updatedDatetime, status: "Scheduled", NOT: { id } } });
    if (existing) return sendBadRequest(res, "Psychologist already has a consultation scheduled at this time");
    const updated = await prisma.consultationSchedule.update({ where: { id }, data: { leadId: leadId ?? schedule.leadId, psychologistId: updatedPsychId, datetime: updatedDatetime, ...rest } });
    return sendSuccess(res, "Consultation schedule updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteConsultationSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Consultation schedule ID is required");
    const schedule = await prisma.consultationSchedule.findUnique({ where: { id } }); if (!schedule) return sendNotFound(res, "Consultation schedule not found");
    await prisma.consultationSchedule.delete({ where: { id } });
    return sendSuccess(res, "Consultation schedule deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createConsultationSchedule, getAllConsultationSchedules, getConsultationScheduleById, updateConsultationSchedule, deleteConsultationSchedule };
