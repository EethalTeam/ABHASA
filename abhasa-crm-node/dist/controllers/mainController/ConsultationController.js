"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConsultation = exports.updateConsultation = exports.getConsultationById = exports.getAllConsultations = exports.createConsultation = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createConsultation = async (req, res) => {
    try {
        const { leadId, psychId, serviceTypeId, datetime, status, cancellationReason, rescheduledFrom, refundInitiated, refundLink, bookedBy, updatedBy } = req.body;
        if (!leadId || !psychId || !serviceTypeId || !datetime)
            return (0, controllerHelper_1.sendBadRequest)(res, "leadId, psychId, serviceTypeId and datetime are required");
        if (isNaN(new Date(datetime).getTime()))
            return (0, controllerHelper_1.sendBadRequest)(res, "Invalid consultation datetime");
        const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        const psych = await prisma_1.prisma.psychologist.findUnique({ where: { id: psychId } });
        if (!psych)
            return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        const service = await prisma_1.prisma.serviceType.findUnique({ where: { id: serviceTypeId } });
        if (!service)
            return (0, controllerHelper_1.sendNotFound)(res, "Service Type not found");
        if (rescheduledFrom) {
            const old = await prisma_1.prisma.consultation.findUnique({ where: { id: rescheduledFrom } });
            if (!old)
                return (0, controllerHelper_1.sendNotFound)(res, "Rescheduled consultation not found");
        }
        const consultation = await prisma_1.prisma.consultation.create({ data: { leadId, psychId, serviceTypeId, datetime, status, cancellationReason, rescheduledFrom, refundInitiated, refundLink, bookedBy, updatedBy } });
        return (0, controllerHelper_1.sendCreated)(res, "Consultation created successfully", consultation);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createConsultation = createConsultation;
const getAllConsultations = async (req, res) => {
    try {
        const consultations = await prisma_1.prisma.consultation.findMany({
            include: {
                lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
                psychologist: { select: { id: true, name: true, specialization: true } },
                serviceType: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultations retrieved successfully", consultations);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllConsultations = getAllConsultations;
const getConsultationById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation ID is required");
        const consultation = await prisma_1.prisma.consultation.findUnique({
            where: { id },
            include: {
                lead: { select: { id: true, callerName: true, patientName: true, phone: true } },
                psychologist: { select: { id: true, name: true, specialization: true } },
                serviceType: { select: { id: true, name: true } },
            },
        });
        if (!consultation)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation retrieved successfully", consultation);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getConsultationById = getConsultationById;
const updateConsultation = async (req, res) => {
    try {
        const { id, leadId, psychId, serviceTypeId, datetime, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation ID is required");
        const consultation = await prisma_1.prisma.consultation.findUnique({ where: { id } });
        if (!consultation)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation not found");
        if (datetime && isNaN(new Date(datetime).getTime()))
            return (0, controllerHelper_1.sendBadRequest)(res, "Invalid consultation datetime");
        if (leadId) {
            const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
            if (!lead)
                return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        }
        if (psychId) {
            const psych = await prisma_1.prisma.psychologist.findUnique({ where: { id: psychId } });
            if (!psych)
                return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        }
        if (serviceTypeId) {
            const service = await prisma_1.prisma.serviceType.findUnique({ where: { id: serviceTypeId } });
            if (!service)
                return (0, controllerHelper_1.sendNotFound)(res, "Service Type not found");
        }
        const updated = await prisma_1.prisma.consultation.update({ where: { id }, data: { leadId: leadId ?? consultation.leadId, psychId: psychId ?? consultation.psychId, serviceTypeId: serviceTypeId ?? consultation.serviceTypeId, datetime: datetime ?? consultation.datetime, ...rest } });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateConsultation = updateConsultation;
const deleteConsultation = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Consultation ID is required");
        const consultation = await prisma_1.prisma.consultation.findUnique({ where: { id } });
        if (!consultation)
            return (0, controllerHelper_1.sendNotFound)(res, "Consultation not found");
        await prisma_1.prisma.consultation.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Consultation deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteConsultation = deleteConsultation;
