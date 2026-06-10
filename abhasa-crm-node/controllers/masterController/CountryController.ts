import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendServerError } from "../common/controllerHelper";

const createCountry = async (req: Request, res: Response) => {
  try {
    const { name, code, phoneCode, isActive } = req.body;
    if (!name) return sendBadRequest(res, "Country name is required");
    const existingName = await prisma.country.findFirst({ where: { name } });
    if (existingName) return sendBadRequest(res, "Country already exists");
    if (code) {
      const existingCode = await prisma.country.findFirst({ where: { code } });
      if (existingCode) return sendBadRequest(res, "Country code already exists");
    }
    const country = await prisma.country.create({ data: { name, code, phoneCode, isActive } });
    return sendCreated(res, "Country created successfully", country);
  } catch (error) { return sendServerError(res, error); }
};

const getAllCountries = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const countries = await prisma.country.findMany({
      where: { ...(isActive !== undefined && { isActive: isActive === "true" }) },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, "Countries fetched successfully", countries);
  } catch (error) { return sendServerError(res, error); }
};

const getCountryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "ID is required");
    const country = await prisma.country.findUnique({ where: { id } });
    if (!country) return sendNotFound(res, "Country not found");
    return sendSuccess(res, "Country fetched successfully", country);
  } catch (error) { return sendServerError(res, error); }
};

const updateCountry = async (req: Request, res: Response) => {
  try {
    const { id, name, code, phoneCode, isActive } = req.body;
    if (!id) return sendBadRequest(res, "ID is required");
    const country = await prisma.country.findUnique({ where: { id } });
    if (!country) return sendNotFound(res, "Country not found");
    if (name && name !== country.name) {
      const existing = await prisma.country.findFirst({ where: { name, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Country already exists");
    }
    if (code && code !== country.code) {
      const existing = await prisma.country.findFirst({ where: { code, NOT: { id } } });
      if (existing) return sendBadRequest(res, "Country code already exists");
    }
    const updated = await prisma.country.update({
      where: { id },
      data: { name: name ?? country.name, code: code ?? country.code, phoneCode: phoneCode ?? country.phoneCode, isActive: isActive ?? country.isActive },
    });
    return sendSuccess(res, "Country updated successfully", updated);
  } catch (error) { return sendServerError(res, error); }
};

const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return sendBadRequest(res, "ID is required");
    const country = await prisma.country.findUnique({ where: { id } });
    if (!country) return sendNotFound(res, "Country not found");
    await prisma.country.delete({ where: { id } });
    return sendSuccess(res, "Country deleted successfully");
  } catch (error) { return sendServerError(res, error); }
};

export { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry };
