"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLeadRelation = exports.updateLeadRelation = exports.getLeadRelationById = exports.getAllLeadRelations = exports.createLeadRelation = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createLeadRelation = async (req, res) => {
    try {
        const { leadId, sourceId, statusId, agentId, notes, assignedAt, closedAt } = req.body;
        if (!leadId || !sourceId || !statusId || !agentId)
            return (0, controllerHelper_1.sendBadRequest)(res, "leadId, sourceId, statusId and agentId are required");
        const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        const source = await prisma_1.prisma.source.findUnique({ where: { id: sourceId } });
        if (!source)
            return (0, controllerHelper_1.sendNotFound)(res, "Source not found");
        const status = await prisma_1.prisma.status.findUnique({ where: { id: statusId } });
        if (!status)
            return (0, controllerHelper_1.sendNotFound)(res, "Status not found");
        const agent = await prisma_1.prisma.agent.findUnique({ where: { id: agentId } });
        if (!agent)
            return (0, controllerHelper_1.sendNotFound)(res, "Agent not found");
        const leadRelation = await prisma_1.prisma.leadRelation.create({ data: { leadId, sourceId, statusId, agentId, notes, assignedAt, closedAt } });
        return (0, controllerHelper_1.sendCreated)(res, "Lead relation created successfully", leadRelation);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createLeadRelation = createLeadRelation;
const getAllLeadRelations = async (req, res) => {
    try {
        const leadRelations = await prisma_1.prisma.leadRelation.findMany({
            include: {
                lead: true,
                source: { select: { id: true, name: true } },
                status: { select: { id: true, name: true } },
                agent: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Lead relations retrieved successfully", leadRelations);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllLeadRelations = getAllLeadRelations;
const getLeadRelationById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Lead relation ID is required");
        const leadRelation = await prisma_1.prisma.leadRelation.findUnique({
            where: { id },
            include: {
                lead: true,
                source: { select: { id: true, name: true } },
                status: { select: { id: true, name: true } },
                agent: { select: { id: true, name: true, email: true } },
            },
        });
        if (!leadRelation)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead relation not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Lead relation retrieved successfully", leadRelation);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getLeadRelationById = getLeadRelationById;
const updateLeadRelation = async (req, res) => {
    try {
        const { id, leadId, sourceId, statusId, agentId, notes, assignedAt, closedAt } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Lead relation ID is required");
        const leadRelation = await prisma_1.prisma.leadRelation.findUnique({ where: { id } });
        if (!leadRelation)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead relation not found");
        if (leadId) {
            const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
            if (!lead)
                return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        }
        if (sourceId) {
            const source = await prisma_1.prisma.source.findUnique({ where: { id: sourceId } });
            if (!source)
                return (0, controllerHelper_1.sendNotFound)(res, "Source not found");
        }
        if (statusId) {
            const status = await prisma_1.prisma.status.findUnique({ where: { id: statusId } });
            if (!status)
                return (0, controllerHelper_1.sendNotFound)(res, "Status not found");
        }
        if (agentId) {
            const agent = await prisma_1.prisma.agent.findUnique({ where: { id: agentId } });
            if (!agent)
                return (0, controllerHelper_1.sendNotFound)(res, "Agent not found");
        }
        const updated = await prisma_1.prisma.leadRelation.update({
            where: { id },
            data: {
                leadId: leadId ?? leadRelation.leadId,
                sourceId: sourceId ?? leadRelation.sourceId,
                statusId: statusId ?? leadRelation.statusId,
                agentId: agentId ?? leadRelation.agentId,
                notes: notes ?? leadRelation.notes,
                assignedAt: assignedAt ?? leadRelation.assignedAt,
                closedAt: closedAt ?? leadRelation.closedAt,
            },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Lead relation updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateLeadRelation = updateLeadRelation;
const deleteLeadRelation = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Lead relation ID is required");
        const leadRelation = await prisma_1.prisma.leadRelation.findUnique({ where: { id } });
        if (!leadRelation)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead relation not found");
        await prisma_1.prisma.leadRelation.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Lead relation deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteLeadRelation = deleteLeadRelation;
