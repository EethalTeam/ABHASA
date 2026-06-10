import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createState = async (req: Request, res: Response) => {
  try {
    const { name, countryId, isActive } = req.body;
    if (!name || !countryId) return sendBadRequest(res, "Name and countryId are required");
    const country = await prisma.country.findUnique({ where: { id: countryId } });
    if (!country) return sendNotFound(res, "Country not found");
    const existing = await prisma.state.findFirst({ where: { name, countryId } });
    if (existing) return sendBadRequest(res, "State already exists in this country");
    const state = await prisma.state.create({ data: { name, countryId, isActive } });
    return sendCreated(res, "State created successfully", state);
  } catch (error) { return sendServerError(res, error); }
};

const getAllStates = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const states = await prisma.state.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      include: { country: { select: { id: true, name: true, code: true } } },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "States retrieved successfully", states);
  } catch (error) { return sendServerError(res, error); }
};

const getStateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "State ID is required");
    const state = await prisma.state.findUnique({
      where: { id },
      include: { country: { select: { id: true, name: true, code: true } } },
    });
    if (!state) return sendNotFound(res, "State not found");
    return sendSuccess(res, "State retrieved successfully", state);
  } catch (error) { return sendServerError(res, error); }
};

const updateState = async (req: Request, res: Response) => {
  try {
    const { id, name, countryId, isActive } = req.body;
    if (!id) return sendBadRequest(res, "State ID is required");
    const state = await prisma.state.findUnique({ where: { id } });
    if (!state) return sendNotFound(res, "State not found");
    if (countryId) {
      const country = await prisma.country.findUnique({ where: { id: countryId } });
      if (!country) return sendNotFound(res, "Country not found");
    }
    if (name || countryId) {
      const existing = await prisma.state.findFirst({
        where: { name: name ?? state.name, countryId: countryId ?? state.countryId, NOT: { id } },
      });
      if (existing) return sendBadRequest(res, "State already exists in this country");
    }
    const updated = await prisma.state.update({
      where: { id },
      data: { name: name ?? state.name, countryId: countryId ?? state.countryId, isActive: isActive ?? state.isActive },
    });
    return sendSuccess(res, "State updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteState = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "State ID is required");
    const state = await prisma.state.findUnique({ where: { id } });
    if (!state) return sendNotFound(res, "State not found");
    await prisma.state.delete({ where: { id } });
    return sendSuccess(res, "State deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createState, getAllStates, getStateById, updateState, deleteState };
