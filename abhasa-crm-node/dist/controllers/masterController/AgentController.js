"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgent = exports.updateAgent = exports.getAgentById = exports.getAllAgents = exports.createAgent = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createAgent = async (req, res) => {
    try {
        const { name, email, phone, role, isActive } = req.body;
        if (!name || !email)
            return (0, controllerHelper_1.sendBadRequest)(res, "Name and Email are required");
        const existingAgent = await prisma_1.prisma.agent.findFirst({ where: { email } });
        if (existingAgent)
            return (0, controllerHelper_1.sendBadRequest)(res, "Email already exists");
        const agent = await prisma_1.prisma.agent.create({ data: { name, email, phone, role, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Agent created successfully", agent);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createAgent = createAgent;
const getAllAgents = async (req, res) => {
    try {
        const { isActive } = req.query;
        const agents = await prisma_1.prisma.agent.findMany({
            where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Agents retrieved successfully", agents);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllAgents = getAllAgents;
const getAgentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Agent ID is required");
        const agent = await prisma_1.prisma.agent.findUnique({ where: { id } });
        if (!agent)
            return (0, controllerHelper_1.sendNotFound)(res, "Agent not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Agent retrieved successfully", agent);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAgentById = getAgentById;
const updateAgent = async (req, res) => {
    try {
        const { id, name, email, phone, role, isActive } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Agent ID is required");
        const agent = await prisma_1.prisma.agent.findUnique({ where: { id } });
        if (!agent)
            return (0, controllerHelper_1.sendNotFound)(res, "Agent not found");
        if (email && email !== agent.email) {
            const existing = await prisma_1.prisma.agent.findFirst({ where: { email, NOT: { id } } });
            if (existing)
                return (0, controllerHelper_1.sendBadRequest)(res, "Email already exists");
        }
        const updated = await prisma_1.prisma.agent.update({
            where: { id },
            data: { name: name ?? agent.name, email: email ?? agent.email, phone: phone ?? agent.phone, role: role ?? agent.role, isActive: isActive ?? agent.isActive },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Agent updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateAgent = updateAgent;
const deleteAgent = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Agent ID is required");
        const agent = await prisma_1.prisma.agent.findUnique({ where: { id } });
        if (!agent)
            return (0, controllerHelper_1.sendNotFound)(res, "Agent not found");
        await prisma_1.prisma.agent.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Agent deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteAgent = deleteAgent;
