import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createAgent = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role, isActive } = req.body;
    if (!name || !email) return sendBadRequest(res, "Name and Email are required");
    const existingAgent = await prisma.agent.findFirst({ where: { email } });
    if (existingAgent) return sendBadRequest(res, "Email already exists");
    const agent = await prisma.agent.create({ data: { name, email, phone, role, isActive } });
    return sendCreated(res, "Agent created successfully", agent);
  } catch (error) { return sendServerError(res, error); }
};

const getAllAgents = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const agents = await prisma.agent.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Agents retrieved successfully", agents);
  } catch (error) { return sendServerError(res, error); }
};

const getAgentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Agent ID is required");
    const agent = await prisma.agent.findUnique({ where: { id } });
    if (!agent) return sendNotFound(res, "Agent not found");
    return sendSuccess(res, "Agent retrieved successfully", agent);
  } catch (error) { return sendServerError(res, error); }
};

const updateAgent = async (req: Request, res: Response) => {
  try {
    const { id, name, email, phone, role, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Agent ID is required");
    const agent = await prisma.agent.findUnique({ where: { id } });
    if (!agent) return sendNotFound(res, "Agent not found");
    if (email && email !== agent.email) {
      const existing = await prisma.agent.findFirst({ where: { email, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Email already exists");
    }
    const updated = await prisma.agent.update({
      where: { id },
      data: { name: name ?? agent.name, email: email ?? agent.email, phone: phone ?? agent.phone, role: role ?? agent.role, isActive: isActive ?? agent.isActive },
    });
    return sendSuccess(res, "Agent updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Agent ID is required");
    const agent = await prisma.agent.findUnique({ where: { id } });
    if (!agent) return sendNotFound(res, "Agent not found");
    await prisma.agent.delete({ where: { id } });
    return sendSuccess(res, "Agent deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createAgent, getAllAgents, getAgentById, updateAgent, deleteAgent };
