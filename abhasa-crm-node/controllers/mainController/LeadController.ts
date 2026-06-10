import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createLead = async (req: Request, res: Response) => {
  try {
    const { callerName, patientName, relationshipWithPatient, phone, email, cityId, sourceId, serviceInterested, status, temperature, leadScore, assignedAgent, psychologistAssigned, consultationStatus, paymentStatus, followUpAssignedTo, followUpDate, followUpStatus } = req.body;
    if (!callerName || !patientName || !phone) return sendBadRequest(res, "callerName, patientName and phone are required");
    if (!/^\d{10}$/.test(phone)) return sendBadRequest(res, "Phone number must be 10 digits");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendBadRequest(res, "Invalid email format");
    if (cityId) { const city = await prisma.city.findUnique({ where: { id: cityId } }); if (!city) return sendNotFound(res, "City not found"); }
    if (sourceId) { const source = await prisma.source.findUnique({ where: { id: sourceId } }); if (!source) return sendNotFound(res, "Source not found"); }
    if (assignedAgent) { const agent = await prisma.agent.findUnique({ where: { id: assignedAgent } }); if (!agent) return sendNotFound(res, "Agent not found"); }
    if (psychologistAssigned) { const psych = await prisma.psychologist.findUnique({ where: { id: psychologistAssigned } }); if (!psych) return sendNotFound(res, "Psychologist not found"); }
    const lead = await prisma.lead.create({ data: { callerName, patientName, relationshipWithPatient, phone, email, cityId, sourceId, serviceInterested, status, temperature, leadScore, assignedAgent, psychologistAssigned, consultationStatus, paymentStatus, followUpAssignedTo, followUpDate, followUpStatus, lastActivity: new Date() } });
    return sendCreated(res, "Lead created successfully", lead);
  } catch (error) { return sendServerError(res, error); }
};

const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        city: { select: { id: true, name: true } },
        source: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Leads retrieved successfully", leads);
  } catch (error) { return sendServerError(res, error); }
};

const getLeadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Lead ID is required");
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        city: { select: { id: true, name: true } },
        source: { select: { id: true, name: true } },
      },
    });
    if (!lead) return sendNotFound(res, "Lead not found");
    return sendSuccess(res, "Lead retrieved successfully", lead);
  } catch (error) { return sendServerError(res, error); }
};

const updateLead = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Lead ID is required");
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) return sendNotFound(res, "Lead not found");
    const updated = await prisma.lead.update({ where: { id }, data: { ...rest, lastActivity: new Date() } });
    return sendSuccess(res, "Lead updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Lead ID is required");
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) return sendNotFound(res, "Lead not found");
    await prisma.lead.delete({ where: { id } });
    return sendSuccess(res, "Lead deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createLead, getAllLeads, getLeadById, updateLead, deleteLead };
