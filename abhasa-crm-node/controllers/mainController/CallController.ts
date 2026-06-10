import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createCall = async (req: Request, res: Response) => {
  try {
    const { leadId, patientId, agentId, duration, timestamp, aiInsights } = req.body;
    if (!leadId || !agentId) return sendBadRequest(res, "leadId and agentId are required");
    const call = await prisma.call.create({ data: { leadId, patientId, agentId, duration, timestamp, aiInsights } });
    return sendCreated(res, "Call created successfully", call);
  } catch (error) { return sendServerError(res, error); }
};

const getAllCalls = async (req: Request, res: Response) => {
  try {
    const { leadId, patientId, agentId } = req.body;
    const calls = await prisma.call.findMany({
      where: {
        ...(leadId && { leadId }),
        ...(patientId && { patientId }),
        ...(agentId && { agentId }),
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Calls retrieved successfully", calls);
  } catch (error) { return sendServerError(res, error); }
};

const getCallById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Call ID is required");
    const call = await prisma.call.findUnique({ where: { id } });
    if (!call) return sendNotFound(res, "Call not found");
    return sendSuccess(res, "Call retrieved successfully", call);
  } catch (error) { return sendServerError(res, error); }
};

const updateCall = async (req: Request, res: Response) => {
  try {
    const { id, leadId, patientId, agentId, duration, timestamp, aiInsights } = req.body;
    if (!id) return sendBadRequest(res, "Call ID is required");
    const call = await prisma.call.findUnique({ where: { id } });
    if (!call) return sendNotFound(res, "Call not found");
    const updated = await prisma.call.update({
      where: { id },
      data: { leadId: leadId ?? call.leadId, patientId: patientId ?? call.patientId, agentId: agentId ?? call.agentId, duration: duration ?? call.duration, timestamp: timestamp ?? call.timestamp, aiInsights: aiInsights ?? call.aiInsights },
    });
    return sendSuccess(res, "Call updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteCall = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Call ID is required");
    const call = await prisma.call.findUnique({ where: { id } });
    if (!call) return sendNotFound(res, "Call not found");
    await prisma.call.delete({ where: { id } });
    return sendSuccess(res, "Call deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createCall, getAllCalls, getCallById, updateCall, deleteCall };
