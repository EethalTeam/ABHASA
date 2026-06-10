import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createFollowUp = async (req: Request, res: Response) => {
  try {
    const { leadId, patientName, callerName, phone, serviceInterested, city, status, temperature, followUpAssignedTo, followUpDate, followUpStatus, followUpRemarks, rescheduledDate, updatedBy, isActive } = req.body;
    if (!leadId || !patientName || !callerName || !phone || !serviceInterested || !followUpAssignedTo || !followUpDate) return sendBadRequest(res, "Required fields are missing");
    const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found");
    const assignedUser = await prisma.user.findUnique({ where: { id: followUpAssignedTo } }); if (!assignedUser) return sendNotFound(res, "Assigned user not found");
    if (followUpStatus === "Rescheduled" && !rescheduledDate) return sendBadRequest(res, "Rescheduled date is required");
    const followUp = await prisma.followUp.create({ data: { leadId, patientName, callerName, phone, serviceInterested, city, status, temperature, followUpAssignedTo, followUpDate, followUpStatus, followUpRemarks, rescheduledDate, updatedBy, isActive } });
    return sendCreated(res, "Follow up created successfully", followUp);
  } catch (error) { return sendServerError(res, error); }
};

const getAllFollowUps = async (req: Request, res: Response) => {
  try {
    const followUps = await prisma.followUp.findMany({
      include: { lead: { select: { id: true, patientName: true, callerName: true, phone: true } } },
      orderBy: { followUpDate: "asc" },
    });
    return sendSuccess(res, "Follow ups retrieved successfully", followUps);
  } catch (error) { return sendServerError(res, error); }
};

const getFollowUpById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Follow up ID is required");
    const followUp = await prisma.followUp.findUnique({
      where: { id },
      include: { lead: { select: { id: true, patientName: true, callerName: true, phone: true } } },
    });
    if (!followUp) return sendNotFound(res, "Follow up not found");
    return sendSuccess(res, "Follow up retrieved successfully", followUp);
  } catch (error) { return sendServerError(res, error); }
};

const updateFollowUp = async (req: Request, res: Response) => {
  try {
    const { id, leadId, followUpStatus, rescheduledDate, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Follow up ID is required");
    const followUp = await prisma.followUp.findUnique({ where: { id } }); if (!followUp) return sendNotFound(res, "Follow up not found");
    if (leadId) { const lead = await prisma.lead.findUnique({ where: { id: leadId } }); if (!lead) return sendNotFound(res, "Lead not found"); }
    if (followUpStatus === "Rescheduled" && !rescheduledDate) return sendBadRequest(res, "Rescheduled date is required");
    const updated = await prisma.followUp.update({ where: { id }, data: { leadId: leadId ?? followUp.leadId, followUpStatus: followUpStatus ?? followUp.followUpStatus, rescheduledDate: rescheduledDate ?? followUp.rescheduledDate, ...rest } });
    return sendSuccess(res, "Follow up updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteFollowUp = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Follow up ID is required");
    const followUp = await prisma.followUp.findUnique({ where: { id } }); if (!followUp) return sendNotFound(res, "Follow up not found");
    await prisma.followUp.delete({ where: { id } });
    return sendSuccess(res, "Follow up deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createFollowUp, getAllFollowUps, getFollowUpById, updateFollowUp, deleteFollowUp };
