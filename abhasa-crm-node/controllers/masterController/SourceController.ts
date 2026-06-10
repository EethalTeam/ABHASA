import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createSource = async (req: Request, res: Response) => {
  try {
    const { name, description, isActive } = req.body;
    if (!name) return sendBadRequest(res, "Source name is required");
    const existing = await prisma.source.findFirst({ where: { name } });
    if (existing) return sendBadRequest(res, "Source already exists");
    const source = await prisma.source.create({ data: { name, description, isActive } });
    return sendCreated(res, "Source created successfully", source);
  } catch (error) { return sendServerError(res, error); }
};

const getAllSources = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const sources = await prisma.source.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Sources retrieved successfully", sources);
  } catch (error) { return sendServerError(res, error); }
};

const getSourceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Source ID is required");
    const source = await prisma.source.findUnique({ where: { id } });
    if (!source) return sendNotFound(res, "Source not found");
    return sendSuccess(res, "Source retrieved successfully", source);
  } catch (error) { return sendServerError(res, error); }
};

const updateSource = async (req: Request, res: Response) => {
  try {
    const { id, name, description, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Source ID is required");
    const source = await prisma.source.findUnique({ where: { id } });
    if (!source) return sendNotFound(res, "Source not found");
    if (name && name !== source.name) {
      const existing = await prisma.source.findFirst({ where: { name, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Source already exists");
    }
    const updated = await prisma.source.update({
      where: { id },
      data: { name: name ?? source.name, description: description ?? source.description, isActive: isActive ?? source.isActive },
    });
    return sendSuccess(res, "Source updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteSource = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Source ID is required");
    const source = await prisma.source.findUnique({ where: { id } });
    if (!source) return sendNotFound(res, "Source not found");
    await prisma.source.delete({ where: { id } });
    return sendSuccess(res, "Source deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createSource, getAllSources, getSourceById, updateSource, deleteSource };
