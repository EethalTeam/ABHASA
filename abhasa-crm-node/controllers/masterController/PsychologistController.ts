import { Request, Response } from "express";
import { prisma } from "../../src/lib/prisma";
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "../common/controllerHelper";

/**
 * CREATE PSYCHOLOGIST
 */
const createPsychologist = async (req: Request, res: Response) => {
  try {
    const { name, specialization, avgRating, workload, email, phone, experience, isActive } = req.body;

    if (!name || !specialization) {
      return sendBadRequest(res, "Name and specialization are required");
    }

    if (email) {
      const existingEmail = await prisma.psychologist.findFirst({ where: { email } });
      if (existingEmail) {
        return sendBadRequest(res, "Email already exists");
      }
    }

    const psychologist = await prisma.psychologist.create({
      data: { name, specialization, avgRating, workload, email, phone, experience, isActive },
    });

    return sendCreated(res, "Psychologist created successfully", psychologist);
  } catch (error) {
    console.error("Create Psychologist Error:", error);
    return sendServerError(res, error);
  }
};

/**
 * GET ALL PSYCHOLOGISTS
 */
const getAllPsychologists = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;

    const psychologists = await prisma.psychologist.findMany({
      where: {
        ...(isActive !== undefined && { isActive: isActive === "true" }),
      },
      include: {
        consultations: {
          select: { id: true, datetime: true, status: true },
        },
        consultationHistories: {
          select: { id: true, consultationDate: true, recommendations: true },
        },
        consultationRooms: {
          select: { id: true, sessionStartTime: true, consultationStatus: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return sendSuccess(res, "Psychologists retrieved successfully", psychologists);
  } catch (error) {
    console.error("Get Psychologists Error:", error);
    return sendServerError(res, error);
  }
};

/**
 * GET PSYCHOLOGIST BY ID
 */
const getPsychologistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return sendBadRequest(res, "Psychologist ID is required");
    }

    const psychologist = await prisma.psychologist.findUnique({
      where: { id },
      include: {
        consultations: {
          select: { id: true, datetime: true, status: true },
        },
        consultationHistories: {
          select: { id: true, consultationDate: true, recommendations: true },
        },
        consultationRooms: {
          select: { id: true, sessionStartTime: true, consultationStatus: true },
        },
      },
    });

    if (!psychologist) {
      return sendNotFound(res, "Psychologist not found");
    }

    return sendSuccess(res, "Psychologist retrieved successfully", psychologist);
  } catch (error) {
    console.error("Get Psychologist Error:", error);
    return sendServerError(res, error);
  }
};

/**
 * UPDATE PSYCHOLOGIST
 */
const updatePsychologist = async (req: Request, res: Response) => {
  try {
    const { id, name, specialization, avgRating, workload, email, phone, experience, isActive } = req.body;

    if (!id) {
      return sendBadRequest(res, "Psychologist ID is required");
    }

    const psychologist = await prisma.psychologist.findUnique({ where: { id } });

    if (!psychologist) {
      return sendNotFound(res, "Psychologist not found");
    }

    if (email && email !== psychologist.email) {
      const existingEmail = await prisma.psychologist.findFirst({
        where: { email, NOT: { id } },
      });
      if (existingEmail) {
        return sendBadRequest(res, "Email already exists");
      }
    }

    const updated = await prisma.psychologist.update({
      where: { id },
      data: {
        name:           name           ?? psychologist.name,
        specialization: specialization ?? psychologist.specialization,
        avgRating:      avgRating      ?? psychologist.avgRating,
        workload:       workload       ?? psychologist.workload,
        email:          email          ?? psychologist.email,
        phone:          phone          ?? psychologist.phone,
        experience:     experience     ?? psychologist.experience,
        isActive:       isActive       ?? psychologist.isActive,
      },
    });

    return sendSuccess(res, "Psychologist updated successfully", updated);
  } catch (error) {
    console.error("Update Psychologist Error:", error);
    return sendServerError(res, error);
  }
};

/**
 * DELETE PSYCHOLOGIST
 */
const deletePsychologist = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return sendBadRequest(res, "Psychologist ID is required");
    }

    const psychologist = await prisma.psychologist.findUnique({ where: { id } });

    if (!psychologist) {
      return sendNotFound(res, "Psychologist not found");
    }

    await prisma.psychologist.delete({ where: { id } });

    return sendSuccess(res, "Psychologist deleted successfully");
  } catch (error) {
    console.error("Delete Psychologist Error:", error);
    return sendServerError(res, error);
  }
};

export {
  createPsychologist,
  getAllPsychologists,
  getPsychologistById,
  updatePsychologist,
  deletePsychologist,
};