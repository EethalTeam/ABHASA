import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createLeadRelation = async (req: Request, res: Response) => {
  try {
    const { leadId, sourceId, statusId, agentId, notes, assignedAt, closedAt } = req.body;
    if (!leadId || !sourceId || !statusId || !agentId) return sendBadRequest(res, "leadId, sourceId, statusId and agentId are required");
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return sendNotFound(res, "Lead not found");
    const source = await prisma.source.findUnique({ where: { id: sourceId } });
    if (!source) return sendNotFound(res, "Source not found");
    const status = await prisma.status.findUnique({ where: { id: statusId } });
    if (!status) return sendNotFound(res, "Status not found");
    const agent = await prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) return sendNotFound(res, "Agent not found");
    const leadRelation = await prisma.leadRelation.create({ data: { leadId, sourceId, statusId, agentId, notes, assignedAt, closedAt } });
    return sendCreated(res, "Lead relation created successfully", leadRelation);
  } catch (error) { return sendServerError(res, error); }
};

const getAllLeadRelations = async (req: Request, res: Response) => {
  try {
    const leadRelations = await prisma.leadRelation.findMany({
      include: {
        lead: true,
        source: { select: { id: true, name: true } },
        status: { select: { id: true, name: true } },
        agent: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Lead relations retrieved successfully", leadRelations);
  } catch (error) { return sendServerError(res, error); }
};

const getLeadRelationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Lead relation ID is required");
    const leadRelation = await prisma.leadRelation.findUnique({
      where: { id },
      include: {
        lead: true,
        source: { select: { id: true, name: true } },
        status: { select: { id: true, name: true } },
        agent: { select: { id: true, name: true, email: true } },
      },
    });
    if (!leadRelation) return sendNotFound(res, "Lead relation not found");
    return sendSuccess(res, "Lead relation retrieved successfully", leadRelation);
  } catch (error) { return sendServerError(res, error); }
};

const updateLeadRelation = async (req: Request, res: Response) => {
  try {
    const { id, leadId, sourceId, statusId, agentId, notes, assignedAt, closedAt } = req.body;
    if (!id) return sendBadRequest(res, "Lead relation ID is required");
    const leadRelation = await prisma.leadRelation.findUnique({ where: { id } });
    if (!leadRelation) return sendNotFound(res, "Lead relation not found");
    if (leadId) { const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found"); }
    if (sourceId) { const source = await prisma.source.findUnique({ where: { id: sourceId } }); if (!source) return sendNotFound(res, "Source not found"); }
    if (statusId) { const status = await prisma.status.findUnique({ where: { id: statusId } }); if (!status) return sendNotFound(res, "Status not found"); }
    if (agentId) { const agent = await prisma.agent.findUnique({ where: { id: agentId } }); if (!agent) return sendNotFound(res, "Agent not found"); }
    const updated = await prisma.leadRelation.update({
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
    return sendSuccess(res, "Lead relation updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteLeadRelation = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Lead relation ID is required");
    const leadRelation = await prisma.leadRelation.findUnique({ where: { id } });
    if (!leadRelation) return sendNotFound(res, "Lead relation not found");
    await prisma.leadRelation.delete({ where: { id } });
    return sendSuccess(res, "Lead relation deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createLeadRelation, getAllLeadRelations, getLeadRelationById, updateLeadRelation, deleteLeadRelation };
