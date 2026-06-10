"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class Lead extends sequelize_1.Model {
}
Lead.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    callerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    relationshipWithPatient: {
        type: sequelize_1.DataTypes.ENUM("Self", "Mother", "Father", "Spouse", "Friend"),
        defaultValue: "Self",
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cityId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "cities",
            key: "id",
        },
        onDelete: "SET NULL",
    },
    sourceId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "sources",
            key: "id",
        },
        onDelete: "SET NULL",
    },
    serviceInterested: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("New", "Active", "Converted", "Lost"),
        defaultValue: "New",
    },
    temperature: {
        type: sequelize_1.DataTypes.ENUM("Hot", "Warm", "Cold"),
        defaultValue: "Warm",
    },
    leadScore: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    assignedAgent: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    psychologistAssigned: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    consultationStatus: {
        type: sequelize_1.DataTypes.ENUM("Scheduled", "Completed", "Cancelled"),
        defaultValue: "Scheduled",
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.ENUM("Pending", "Paid", "Refunded"),
        defaultValue: "Pending",
    },
    followUpAssignedTo: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    followUpDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    followUpStatus: {
        type: sequelize_1.DataTypes.ENUM("Pending", "Called", "Not Reachable", "Converted", "Rescheduled"),
        defaultValue: "Pending",
    },
    lastActivity: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    modelName: "Lead",
    tableName: "leads",
    timestamps: true,
});
exports.default = Lead;
