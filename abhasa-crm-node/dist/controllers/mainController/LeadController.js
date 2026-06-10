"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getAllLeads = exports.createLead = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createLead = async (req, res) => {
    try {
        const { callerName, patientName, relationshipWithPatient, phone, email, cityId, sourceId, serviceInterested, status, temperature, leadScore, assignedAgent, psychologistAssigned, consultationStatus, paymentStatus, followUpAssignedTo, followUpDate, followUpStatus } = req.body;
        if (!callerName || !patientName || !phone)
            return (0, controllerHelper_1.sendBadRequest)(res, "callerName, patientName and phone are required");
        if (!/^\d{10}$/.test(phone))
            return (0, controllerHelper_1.sendBadRequest)(res, "Phone number must be 10 digits");
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return (0, controllerHelper_1.sendBadRequest)(res, "Invalid email format");
        if (cityId) {
            const city = await prisma_1.prisma.city.findUnique({ where: { id: cityId } });
            if (!city)
                return (0, controllerHelper_1.sendNotFound)(res, "City not found");
        }
        if (sourceId) {
            const source = await prisma_1.prisma.source.findUnique({ where: { id: sourceId } });
            if (!source)
                return (0, controllerHelper_1.sendNotFound)(res, "Source not found");
        }
        if (assignedAgent) {
            const agent = await prisma_1.prisma.agent.findUnique({ where: { id: assignedAgent } });
            if (!agent)
                return (0, controllerHelper_1.sendNotFound)(res, "Agent not found");
        }
        if (psychologistAssigned) {
            const psych = await prisma_1.prisma.psychologist.findUnique({ where: { id: psychologistAssigned } });
            if (!psych)
                return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        }
        const lead = await prisma_1.prisma.lead.create({ data: { callerName, patientName, relationshipWithPatient, phone, email, cityId, sourceId, serviceInterested, status, temperature, leadScore, assignedAgent, psychologistAssigned, consultationStatus, paymentStatus, followUpAssignedTo, followUpDate, followUpStatus, lastActivity: new Date() } });
        return (0, controllerHelper_1.sendCreated)(res, "Lead created successfully", lead);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createLead = createLead;
const getAllLeads = async (req, res) => {
    try {
        const leads = await prisma_1.prisma.lead.findMany({
            include: {
                city: { select: { id: true, name: true } },
                source: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Leads retrieved successfully", leads);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllLeads = getAllLeads;
const getLeadById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Lead ID is required");
        const lead = await prisma_1.prisma.lead.findUnique({
            where: { id },
            include: {
                city: { select: { id: true, name: true } },
                source: { select: { id: true, name: true } },
            },
        });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Lead retrieved successfully", lead);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getLeadById = getLeadById;
const updateLead = async (req, res) => {
    try {
        const { id, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Lead ID is required");
        const lead = await prisma_1.prisma.lead.findUnique({ where: { id } });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        const updated = await prisma_1.prisma.lead.update({ where: { id }, data: { ...rest, lastActivity: new Date() } });
        return (0, controllerHelper_1.sendSuccess)(res, "Lead updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Lead ID is required");
        const lead = await prisma_1.prisma.lead.findUnique({ where: { id } });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        await prisma_1.prisma.lead.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Lead deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteLead = deleteLead;
