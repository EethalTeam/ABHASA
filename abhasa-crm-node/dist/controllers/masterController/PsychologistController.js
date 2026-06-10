"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePsychologist = exports.updatePsychologist = exports.getPsychologistById = exports.getAllPsychologists = exports.createPsychologist = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
/**
 * CREATE PSYCHOLOGIST
 */
const createPsychologist = async (req, res) => {
    try {
        const { name, specialization, avgRating, workload, email, phone, experience, isActive } = req.body;
        if (!name || !specialization) {
            return (0, controllerHelper_1.sendBadRequest)(res, "Name and specialization are required");
        }
        if (email) {
            const existingEmail = await prisma_1.prisma.psychologist.findFirst({ where: { email } });
            if (existingEmail) {
                return (0, controllerHelper_1.sendBadRequest)(res, "Email already exists");
            }
        }
        const psychologist = await prisma_1.prisma.psychologist.create({
            data: { name, specialization, avgRating, workload, email, phone, experience, isActive },
        });
        return (0, controllerHelper_1.sendCreated)(res, "Psychologist created successfully", psychologist);
    }
    catch (error) {
        console.error("Create Psychologist Error:", error);
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createPsychologist = createPsychologist;
/**
 * GET ALL PSYCHOLOGISTS
 */
const getAllPsychologists = async (req, res) => {
    try {
        const { isActive } = req.query;
        const psychologists = await prisma_1.prisma.psychologist.findMany({
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
        return (0, controllerHelper_1.sendSuccess)(res, "Psychologists retrieved successfully", psychologists);
    }
    catch (error) {
        console.error("Get Psychologists Error:", error);
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllPsychologists = getAllPsychologists;
/**
 * GET PSYCHOLOGIST BY ID
 */
const getPsychologistById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return (0, controllerHelper_1.sendBadRequest)(res, "Psychologist ID is required");
        }
        const psychologist = await prisma_1.prisma.psychologist.findUnique({
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
            return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        }
        return (0, controllerHelper_1.sendSuccess)(res, "Psychologist retrieved successfully", psychologist);
    }
    catch (error) {
        console.error("Get Psychologist Error:", error);
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getPsychologistById = getPsychologistById;
/**
 * UPDATE PSYCHOLOGIST
 */
const updatePsychologist = async (req, res) => {
    try {
        const { id, name, specialization, avgRating, workload, email, phone, experience, isActive } = req.body;
        if (!id) {
            return (0, controllerHelper_1.sendBadRequest)(res, "Psychologist ID is required");
        }
        const psychologist = await prisma_1.prisma.psychologist.findUnique({ where: { id } });
        if (!psychologist) {
            return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        }
        if (email && email !== psychologist.email) {
            const existingEmail = await prisma_1.prisma.psychologist.findFirst({
                where: { email, NOT: { id } },
            });
            if (existingEmail) {
                return (0, controllerHelper_1.sendBadRequest)(res, "Email already exists");
            }
        }
        const updated = await prisma_1.prisma.psychologist.update({
            where: { id },
            data: {
                name: name ?? psychologist.name,
                specialization: specialization ?? psychologist.specialization,
                avgRating: avgRating ?? psychologist.avgRating,
                workload: workload ?? psychologist.workload,
                email: email ?? psychologist.email,
                phone: phone ?? psychologist.phone,
                experience: experience ?? psychologist.experience,
                isActive: isActive ?? psychologist.isActive,
            },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Psychologist updated successfully", updated);
    }
    catch (error) {
        console.error("Update Psychologist Error:", error);
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updatePsychologist = updatePsychologist;
/**
 * DELETE PSYCHOLOGIST
 */
const deletePsychologist = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return (0, controllerHelper_1.sendBadRequest)(res, "Psychologist ID is required");
        }
        const psychologist = await prisma_1.prisma.psychologist.findUnique({ where: { id } });
        if (!psychologist) {
            return (0, controllerHelper_1.sendNotFound)(res, "Psychologist not found");
        }
        await prisma_1.prisma.psychologist.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Psychologist deleted successfully");
    }
    catch (error) {
        console.error("Delete Psychologist Error:", error);
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deletePsychologist = deletePsychologist;
