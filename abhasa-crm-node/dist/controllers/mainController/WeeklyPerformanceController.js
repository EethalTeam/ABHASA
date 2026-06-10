"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWeeklyPerformance = exports.updateWeeklyPerformance = exports.getWeeklyPerformanceById = exports.getAllWeeklyPerformances = exports.createWeeklyPerformance = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createWeeklyPerformance = async (req, res) => {
    try {
        const { agentId, agentName, year, month, week, callsHandled, leadsConverted, consultationBookings, revenueContribution, avgSentimentScore, performanceGrade, serviceBreakdown } = req.body;
        if (!agentId || !agentName || !year || !month || !week)
            return (0, controllerHelper_1.sendBadRequest)(res, "agentId, agentName, year, month and week are required");
        if (month < 1 || month > 12)
            return (0, controllerHelper_1.sendBadRequest)(res, "Month must be between 1 and 12");
        if (![1, 2, 3, 4].includes(week))
            return (0, controllerHelper_1.sendBadRequest)(res, "Week must be between 1 and 4");
        const existing = await prisma_1.prisma.weeklyPerformance.findFirst({ where: { agentId, year, month, week } });
        if (existing)
            return (0, controllerHelper_1.sendBadRequest)(res, "Weekly performance already exists for this agent");
        const performance = await prisma_1.prisma.weeklyPerformance.create({ data: { agentId, agentName, year, month, week, callsHandled, leadsConverted, consultationBookings, revenueContribution, avgSentimentScore, performanceGrade, serviceBreakdown } });
        return (0, controllerHelper_1.sendCreated)(res, "Weekly performance created successfully", performance);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createWeeklyPerformance = createWeeklyPerformance;
const getAllWeeklyPerformances = async (req, res) => {
    try {
        const performances = await prisma_1.prisma.weeklyPerformance.findMany({ orderBy: [{ year: "desc" }, { month: "desc" }, { week: "desc" }] });
        return (0, controllerHelper_1.sendSuccess)(res, "Weekly performance retrieved successfully", performances);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllWeeklyPerformances = getAllWeeklyPerformances;
const getWeeklyPerformanceById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Weekly performance ID is required");
        const performance = await prisma_1.prisma.weeklyPerformance.findUnique({ where: { id } });
        if (!performance)
            return (0, controllerHelper_1.sendNotFound)(res, "Weekly performance not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Weekly performance retrieved successfully", performance);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getWeeklyPerformanceById = getWeeklyPerformanceById;
const updateWeeklyPerformance = async (req, res) => {
    try {
        const { id, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Weekly performance ID is required");
        const performance = await prisma_1.prisma.weeklyPerformance.findUnique({ where: { id } });
        if (!performance)
            return (0, controllerHelper_1.sendNotFound)(res, "Weekly performance not found");
        const updated = await prisma_1.prisma.weeklyPerformance.update({ where: { id }, data: rest });
        return (0, controllerHelper_1.sendSuccess)(res, "Weekly performance updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateWeeklyPerformance = updateWeeklyPerformance;
const deleteWeeklyPerformance = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Weekly performance ID is required");
        const performance = await prisma_1.prisma.weeklyPerformance.findUnique({ where: { id } });
        if (!performance)
            return (0, controllerHelper_1.sendNotFound)(res, "Weekly performance not found");
        await prisma_1.prisma.weeklyPerformance.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Weekly performance deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteWeeklyPerformance = deleteWeeklyPerformance;
