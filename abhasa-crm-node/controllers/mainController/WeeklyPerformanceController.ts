import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

export const createWeeklyPerformance = async (req: Request, res: Response) => {
  try {
    const { agentId, agentName, year, month, week, callsHandled, leadsConverted, consultationBookings, revenueContribution, avgSentimentScore, performanceGrade, serviceBreakdown } = req.body;
    if (!agentId || !agentName || !year || !month || !week) return sendBadRequest(res, "agentId, agentName, year, month and week are required");
    if (month < 1 || month > 12) return sendBadRequest(res, "Month must be between 1 and 12");
    if (![1, 2, 3, 4].includes(week)) return sendBadRequest(res, "Week must be between 1 and 4");
    const existing = await prisma.weeklyPerformance.findFirst({ where: { agentId, year, month, week } });
    if (existing) return sendBadRequest(res, "Weekly performance already exists for this agent");
    const performance = await prisma.weeklyPerformance.create({ data: { agentId, agentName, year, month, week, callsHandled, leadsConverted, consultationBookings, revenueContribution, avgSentimentScore, performanceGrade, serviceBreakdown } });
    return sendCreated(res, "Weekly performance created successfully", performance);
  } catch (error) { return sendServerError(res, error); }
};

export const getAllWeeklyPerformances = async (req: Request, res: Response) => {
  try {
    const performances = await prisma.weeklyPerformance.findMany({ orderBy: [{ year: "desc" }, { month: "desc" }, { week: "desc" }] });
    return sendSuccess(res, "Weekly performance retrieved successfully", performances);
  } catch (error) { return sendServerError(res, error); }
};

export const getWeeklyPerformanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Weekly performance ID is required");
    const performance = await prisma.weeklyPerformance.findUnique({ where: { id } });
    if (!performance) return sendNotFound(res, "Weekly performance not found");
    return sendSuccess(res, "Weekly performance retrieved successfully", performance);
  } catch (error) { return sendServerError(res, error); }
};

export const updateWeeklyPerformance = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = req.body;
    if (!id) return sendBadRequest(res, "Weekly performance ID is required");
    const performance = await prisma.weeklyPerformance.findUnique({ where: { id } }); if (!performance) return sendNotFound(res, "Weekly performance not found");
    const updated = await prisma.weeklyPerformance.update({ where: { id }, data: rest });
    return sendSuccess(res, "Weekly performance updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

export const deleteWeeklyPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Weekly performance ID is required");
    const performance = await prisma.weeklyPerformance.findUnique({ where: { id } }); if (!performance) return sendNotFound(res, "Weekly performance not found");
    await prisma.weeklyPerformance.delete({ where: { id } });
    return sendSuccess(res, "Weekly performance deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};
