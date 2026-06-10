"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCall = exports.updateCall = exports.getCallById = exports.getAllCalls = exports.createCall = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createCall = async (req, res) => {
    try {
        const { leadId, patientId, agentId, duration, timestamp, aiInsights } = req.body;
        if (!leadId || !agentId)
            return (0, controllerHelper_1.sendBadRequest)(res, "leadId and agentId are required");
        const call = await prisma_1.prisma.call.create({ data: { leadId, patientId, agentId, duration, timestamp, aiInsights } });
        return (0, controllerHelper_1.sendCreated)(res, "Call created successfully", call);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createCall = createCall;
const getAllCalls = async (req, res) => {
    try {
        const { leadId, patientId, agentId } = req.body;
        const calls = await prisma_1.prisma.call.findMany({
            where: {
                ...(leadId && { leadId }),
                ...(patientId && { patientId }),
                ...(agentId && { agentId }),
            },
            orderBy: { createdAt: "desc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Calls retrieved successfully", calls);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllCalls = getAllCalls;
const getCallById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Call ID is required");
        const call = await prisma_1.prisma.call.findUnique({ where: { id } });
        if (!call)
            return (0, controllerHelper_1.sendNotFound)(res, "Call not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Call retrieved successfully", call);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getCallById = getCallById;
const updateCall = async (req, res) => {
    try {
        const { id, leadId, patientId, agentId, duration, timestamp, aiInsights } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Call ID is required");
        const call = await prisma_1.prisma.call.findUnique({ where: { id } });
        if (!call)
            return (0, controllerHelper_1.sendNotFound)(res, "Call not found");
        const updated = await prisma_1.prisma.call.update({
            where: { id },
            data: { leadId: leadId ?? call.leadId, patientId: patientId ?? call.patientId, agentId: agentId ?? call.agentId, duration: duration ?? call.duration, timestamp: timestamp ?? call.timestamp, aiInsights: aiInsights ?? call.aiInsights },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Call updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateCall = updateCall;
const deleteCall = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Call ID is required");
        const call = await prisma_1.prisma.call.findUnique({ where: { id } });
        if (!call)
            return (0, controllerHelper_1.sendNotFound)(res, "Call not found");
        await prisma_1.prisma.call.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Call deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteCall = deleteCall;
