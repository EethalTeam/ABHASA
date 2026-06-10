"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class Patient extends sequelize_1.Model {
}
Patient.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    callerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    relationship: {
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
    city: {
        type: sequelize_1.DataTypes.STRING,
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
    psychologistAssigned: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    assignedBDM: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    lastConsultation: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "Patient",
    tableName: "patients",
    timestamps: true,
});
exports.default = Patient;
