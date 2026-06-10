"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class FollowUp extends sequelize_1.Model {
}
FollowUp.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    leadId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "leads",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    callerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    serviceInterested: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("Open", "Converted", "Lost"),
        allowNull: false,
        defaultValue: "Open",
    },
    temperature: {
        type: sequelize_1.DataTypes.ENUM("Hot", "Warm", "Cold"),
        allowNull: false,
        defaultValue: "Warm",
    },
    followUpAssignedTo: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    followUpDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    followUpStatus: {
        type: sequelize_1.DataTypes.ENUM("Pending", "Called", "Not Reachable", "Converted", "Rescheduled"),
        allowNull: false,
        defaultValue: "Pending",
    },
    followUpRemarks: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    rescheduledDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "Users",
            key: "id",
        },
        onDelete: "SET NULL",
        defaultValue: null,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "FollowUp",
    tableName: "follow_ups",
    timestamps: true,
});
exports.default = FollowUp;
