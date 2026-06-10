"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFollowUp = exports.updateFollowUp = exports.getFollowUpById = exports.getAllFollowUps = exports.createFollowUp = void 0;
const prisma_1 = require("../../src/lib/prisma");
const controllerHelper_1 = require("../common/controllerHelper");
const createFollowUp = async (req, res) => {
    try {
        const { leadId, patientName, callerName, phone, serviceInterested, city, status, temperature, followUpAssignedTo, followUpDate, followUpStatus, followUpRemarks, rescheduledDate, updatedBy, isActive } = req.body;
        if (!leadId || !patientName || !callerName || !phone || !serviceInterested || !followUpAssignedTo || !followUpDate)
            return (0, controllerHelper_1.sendBadRequest)(res, "Required fields are missing");
        const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
        if (!lead)
            return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        const assignedUser = await prisma_1.prisma.user.findUnique({ where: { id: followUpAssignedTo } });
        if (!assignedUser)
            return (0, controllerHelper_1.sendNotFound)(res, "Assigned user not found");
        if (followUpStatus === "Rescheduled" && !rescheduledDate)
            return (0, controllerHelper_1.sendBadRequest)(res, "Rescheduled date is required");
        const followUp = await prisma_1.prisma.followUp.create({ data: { leadId, patientName, callerName, phone, serviceInterested, city, status, temperature, followUpAssignedTo, followUpDate, followUpStatus, followUpRemarks, rescheduledDate, updatedBy, isActive } });
        return (0, controllerHelper_1.sendCreated)(res, "Follow up created successfully", followUp);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.createFollowUp = createFollowUp;
const getAllFollowUps = async (req, res) => {
    try {
        const followUps = await prisma_1.prisma.followUp.findMany({
            include: { lead: { select: { id: true, patientName: true, callerName: true, phone: true } } },
            orderBy: { followUpDate: "asc" },
        });
        return (0, controllerHelper_1.sendSuccess)(res, "Follow ups retrieved successfully", followUps);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getAllFollowUps = getAllFollowUps;
const getFollowUpById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Follow up ID is required");
        const followUp = await prisma_1.prisma.followUp.findUnique({
            where: { id },
            include: { lead: { select: { id: true, patientName: true, callerName: true, phone: true } } },
        });
        if (!followUp)
            return (0, controllerHelper_1.sendNotFound)(res, "Follow up not found");
        return (0, controllerHelper_1.sendSuccess)(res, "Follow up retrieved successfully", followUp);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.getFollowUpById = getFollowUpById;
const updateFollowUp = async (req, res) => {
    try {
        const { id, leadId, followUpStatus, rescheduledDate, ...rest } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Follow up ID is required");
        const followUp = await prisma_1.prisma.followUp.findUnique({ where: { id } });
        if (!followUp)
            return (0, controllerHelper_1.sendNotFound)(res, "Follow up not found");
        if (leadId) {
            const lead = await prisma_1.prisma.lead.findUnique({ where: { id: leadId } });
            if (!lead)
                return (0, controllerHelper_1.sendNotFound)(res, "Lead not found");
        }
        if (followUpStatus === "Rescheduled" && !rescheduledDate)
            return (0, controllerHelper_1.sendBadRequest)(res, "Rescheduled date is required");
        const updated = await prisma_1.prisma.followUp.update({ where: { id }, data: { leadId: leadId ?? followUp.leadId, followUpStatus: followUpStatus ?? followUp.followUpStatus, rescheduledDate: rescheduledDate ?? followUp.rescheduledDate, ...rest } });
        return (0, controllerHelper_1.sendSuccess)(res, "Follow up updated successfully", updated);
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.updateFollowUp = updateFollowUp;
const deleteFollowUp = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return (0, controllerHelper_1.sendBadRequest)(res, "Follow up ID is required");
        const followUp = await prisma_1.prisma.followUp.findUnique({ where: { id } });
        if (!followUp)
            return (0, controllerHelper_1.sendNotFound)(res, "Follow up not found");
        await prisma_1.prisma.followUp.delete({ where: { id } });
        return (0, controllerHelper_1.sendSuccess)(res, "Follow up deleted successfully");
    }
    catch (error) {
        return (0, controllerHelper_1.sendServerError)(res, error);
    }
};
exports.deleteFollowUp = deleteFollowUp;
