"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConsultationSchedule = exports.updateConsultationSchedule = exports.getConsultationScheduleById = exports.getAllConsultationSchedules = exports.createConsultationSchedule = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createConsultationSchedule = async (req, res) => {
    try {
        const { leadId, psychologistId, datetime, status, createdBy, updatedBy } = req.body;
        if (!leadId || !psychologistId || !datetime)
            return (0, controllerHelper_1.sendBadRequest)(res, "leadId, psychologistId and datetime are required");
        if (isNaN(new Date(datetime).getTime()))
            return (0, controllerHelper_1.sendBadRequest)(res, "Invalid consultation datetime");
        const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        const psych = await prisma_1.prisma.user.findUnique({ where: { id: psychologistId } });
        if (!psych)
            return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        const existing = await prisma_1.prisma.consultationSchedule.findFirst({ where: { psychologistId, datetime: new Date(datetime), status: "Scheduled" } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Psychologist already has a consultation scheduled at this time");
        const schedule = await prisma_1.prisma.consultationSchedule.create({ data: { leadId, psychologistId, datetime, status, createdBy, updatedBy } });
        return (0, controllerHelper_1.sendCreated)(res, "Consultation scheduled successfully", schedule);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createConsultationSchedule = createConsultationSchedule;
const getAllConsultationSchedules = async (req, res) => {
    try {
        const schedules = await prisma_1.prisma.consultationSchedule.findMany({
            include: {
                lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
                psychologist: { select: { id: true, name: true } },
            },
            orderBy: { datetime: "asc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation schedules retrieved successfully", schedules);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllConsultationSchedules = getAllConsultationSchedules;
const getConsultationScheduleById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation schedule ID is required");
        const schedule = await prisma_1.prisma.consultationSchedule.findUnique({
            where: { id },
            include: {
                lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
                psychologist: { select: { id: true, name: true } },
            },
        });
        if (!schedule)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation schedule not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation schedule retrieved successfully", schedule);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getConsultationScheduleById = getConsultationScheduleById;
const updateConsultationSchedule = async (req, res) => {
    try {
        const { id, leadId, psychologistId, datetime, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation schedule ID is required");
        const schedule = await prisma_1.prisma.consultationSchedule.findUnique({ where: { id } });
        if (!schedule)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation schedule not found");
        if (datetime && isNaN(new Date(datetime).getTime()))
            return (0, controllerHelper_1.sendBadRequest)(res, "Invalid consultation datetime");
        if (leadId) {
            const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
            if (!lead)
                return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        }
        if (psychologistId) {
            const psych = await prisma_1.prisma.user.findUnique({ where: { id: psychologistId } });
            if (!psych)
                return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        }
        const updatedPsychId = psychologistId ?? schedule.psychologistId;
        const updatedDatetime = datetime ? new Date(datetime) : schedule.datetime;
        const existing = await prisma_1.prisma.consultationSchedule.findFirst({ where: { psychologistId: updatedPsychId, datetime: updatedDatetime, status: "Scheduled", NOT: { id } } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Psychologist already has a consultation scheduled at this time");
        const updated = await prisma_1.prisma.consultationSchedule.update({ where: { id }, data: { leadId: leadId ?? schedule.leadId, psychologistId: updatedPsychId, datetime: updatedDatetime, ...rest } });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation schedule updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateConsultationSchedule = updateConsultationSchedule;
const deleteConsultationSchedule = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation schedule ID is required");
        const schedule = await prisma_1.prisma.consultationSchedule.findUnique({ where: { id } });
        if (!schedule)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation schedule not found");
        await prisma_1.prisma.consultationSchedule.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation schedule deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteConsultationSchedule = deleteConsultationSchedule;
