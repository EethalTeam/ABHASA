import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createCity = async (req: Request, res: Response) => {
  try {
    const { name, stateId, isActive } = req.body;
    if (!name || !stateId) return sendBadRequest(res, "Name and stateId are required");
    const state = await prisma.state.findUnique({ where: { id: stateId } });
    if (!state) return sendNotFound(res, "State not found");
    const existing = await prisma.city.findFirst({ where: { name, stateId } });
    if (existing) return sendBadRequest(res, "City already exists in this state");
    const city = await prisma.city.create({ data: { name, stateId, isActive } });
    return sendCreated(res, "City created successfully", city);
  } catch (error) { return sendServerError(res, error); }
};

const getAllCities = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const cities = await prisma.city.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      include: { state: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Cities retrieved successfully", cities);
  } catch (error) { return sendServerError(res, error); }
};

const getCityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "City ID is required");
    const city = await prisma.city.findUnique({
      where: { id },
      include: { state: { select: { id: true, name: true } } },
    });
    if (!city) return sendNotFound(res, "City not found");
    return sendSuccess(res, "City retrieved successfully", city);
  } catch (error) { return sendServerError(res, error); }
};

const updateCity = async (req: Request, res: Response) => {
  try {
    const { id, name, stateId, isActive } = req.body;
    if (!id) return sendBadRequest(res, "City ID is required");
    const city = await prisma.city.findUnique({ where: { id } });
    if (!city) return sendNotFound(res, "City not found");
    if (stateId) {
      const state = await prisma.state.findUnique({ where: { id: stateId } });
      if (!state) return sendNotFound(res, "State not found");
    }
    if (name || stateId) {
      const existing = await prisma.city.findFirst({
        where: { name: name ?? city.name, stateId: stateId ?? city.stateId, NOT: { id } },
      });
      if (existing) return sendBadRequest(res, "City already exists in this state");
    }
    const updated = await prisma.city.update({
      where: { id },
      data: { name: name ?? city.name, stateId: stateId ?? city.stateId, isActive: isActive ?? city.isActive },
    });
    return sendSuccess(res, "City updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "City ID is required");
    const city = await prisma.city.findUnique({ where: { id } });
    if (!city) return sendNotFound(res, "City not found");
    await prisma.city.delete({ where: { id } });
    return sendSuccess(res, "City deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createCity, getAllCities, getCityById, updateCity, deleteCity };
