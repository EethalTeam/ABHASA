"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConsultationHistory = exports.updateConsultationHistory = exports.getConsultationHistoryById = exports.getAllConsultationHistory = exports.createConsultationHistory = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createConsultationHistory = async (req, res) => {
    try {
        const { leadId, psychologistId, bdmId, patientName, callerName, serviceInterested, consultationDate, status, recommendations, patientAssessment, averageRating, sessionNotes, feedbackHistory, consultationStartedAt, consultationEndedAt } = req.body;
        if (!leadId || !psychologistId || !patientName || !serviceInterested || !consultationDate)
            return (0, controllerHelper_1.sendBadRequest)(res, "leadId, psychologistId, patientName, serviceInterested and consultationDate are required");
        if (averageRating !== undefined && (averageRating < 0 || averageRating > 5))
            return (0, controllerHelper_1.sendBadRequest)(res, "Rating must be between 0 and 5");
        const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        const psych = await prisma_1.prisma.psychologist.findUnique({ where: { id: psychologistId } });
        if (!psych)
            return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        let sessionDurationInSeconds = 0;
        if (consultationStartedAt && consultationEndedAt) {
            sessionDurationInSeconds = Math.floor((new Date(consultationEndedAt).getTime() - new Date(consultationStartedAt).getTime()) / 1000);
        }
        const history = await prisma_1.prisma.consultationHistory.create({ data: { leadId, psychologistId, bdmId, patientName, callerName, serviceInterested, consultationDate, status, recommendations, patientAssessment, averageRating, sessionNotes, feedbackHistory, consultationStartedAt, consultationEndedAt, sessionDurationInSeconds } });
        return (0, controllerHelper_1.sendCreated)(res, "Consultation history created successfully", history);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createConsultationHistory = createConsultationHistory;
const getAllConsultationHistory = async (req, res) => {
    try {
        const histories = await prisma_1.prisma.consultationHistory.findMany({
            include: {
                lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
                psychologist: { select: { id: true, name: true, specialization: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation history retrieved successfully", histories);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllConsultationHistory = getAllConsultationHistory;
const getConsultationHistoryById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation history ID is required");
        const history = await prisma_1.prisma.consultationHistory.findUnique({
            where: { id },
            include: {
                lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
                psychologist: { select: { id: true, name: true, specialization: true } },
            },
        });
        if (!history)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation history not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation history retrieved successfully", history);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getConsultationHistoryById = getConsultationHistoryById;
const updateConsultationHistory = async (req, res) => {
    try {
        const { id, leadId, psychologistId, averageRating, consultationStartedAt, consultationEndedAt, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation history ID is required");
        const history = await prisma_1.prisma.consultationHistory.findUnique({ where: { id } });
        if (!history)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation history not found");
        if (averageRating !== undefined && (averageRating < 0 || averageRating > 5))
            return (0, controllerHelper_1.sendBadRequest)(res, "Rating must be between 0 and 5");
        if (leadId) {
            const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
            if (!lead)
                return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        }
        if (psychologistId) {
            const psych = await prisma_1.prisma.psychologist.findUnique({ where: { id: psychologistId } });
            if (!psych)
                return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        }
        let sessionDurationInSeconds = history.sessionDurationInSeconds;
        if (consultationStartedAt && consultationEndedAt) {
            sessionDurationInSeconds = Math.floor((new Date(consultationEndedAt).getTime() - new Date(consultationStartedAt).getTime()) / 1000);
        }
        const updated = await prisma_1.prisma.consultationHistory.update({ where: { id }, data: { leadId: leadId ?? history.leadId, psychologistId: psychologistId ?? history.psychologistId, averageRating: averageRating ?? history.averageRating, consultationStartedAt: consultationStartedAt ?? history.consultationStartedAt, consultationEndedAt: consultationEndedAt ?? history.consultationEndedAt, sessionDurationInSeconds, ...rest } });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation history updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateConsultationHistory = updateConsultationHistory;
const deleteConsultationHistory = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation history ID is required");
        const history = await prisma_1.prisma.consultationHistory.findUnique({ where: { id } });
        if (!history)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation history not found");
        await prisma_1.prisma.consultationHistory.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation history deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteConsultationHistory = deleteConsultationHistory;
