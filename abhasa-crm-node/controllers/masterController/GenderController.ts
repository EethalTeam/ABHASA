import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createGender = async (req: Request, res: Response) => {
  try {
    const { code, name, isActive } = req.body;
    if (!code || !name) return sendBadRequest(res, "Code and name are required");
    const formattedCode = code.toUpperCase();
    const existingCode = await prisma.gender.findFirst({ where: { code: formattedCode } });
    if (existingCode) return sendBadRequest(res, "Gender code already exists");
    const existingName = await prisma.gender.findFirst({ where: { name } });
    if (existingName) return sendBadRequest(res, "Gender name already exists");
    const gender = await prisma.gender.create({ data: { code: formattedCode, name, isActive } });
    return sendCreated(res, "Gender created successfully", gender);
  } catch (error) { return sendServerError(res, error); }
};

const getAllGenders = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const genders = await prisma.gender.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Genders retrieved successfully", genders);
  } catch (error) { return sendServerError(res, error); }
};

const getGenderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Gender ID is required");
    const gender = await prisma.gender.findUnique({ where: { id } });
    if (!gender) return sendNotFound(res, "Gender not found");
    return sendSuccess(res, "Gender retrieved successfully", gender);
  } catch (error) { return sendServerError(res, error); }
};

const updateGender = async (req: Request, res: Response) => {
  try {
    const { id, code, name, isActive } = req.body;
    if (!id) return sendBadRequest(res, "Gender ID is required");
    const gender = await prisma.gender.findUnique({ where: { id } });
    if (!gender) return sendNotFound(res, "Gender not found");
    if (code) {
      const formattedCode = code.toUpperCase();
      const existing = await prisma.gender.findFirst({ where: { code: formattedCode, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Gender code already exists");
    }
    if (name) {
      const existing = await prisma.gender.findFirst({ where: { name, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Gender name already exists");
    }
    const updated = await prisma.gender.update({
      where: { id },
      data: { code: code ? code.toUpperCase() : gender.code, name: name ?? gender.name, isActive: isActive ?? gender.isActive },
    });
    return sendSuccess(res, "Gender updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteGender = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "Gender ID is required");
    const gender = await prisma.gender.findUnique({ where: { id } });
    if (!gender) return sendNotFound(res, "Gender not found");
    await prisma.gender.delete({ where: { id } });
    return sendSuccess(res, "Gender deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createGender, getAllGenders, getGenderById, updateGender, deleteGender };
