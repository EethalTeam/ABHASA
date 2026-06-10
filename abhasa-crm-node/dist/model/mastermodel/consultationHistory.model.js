"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class ConsultationHistory extends sequelize_1.Model {
}
ConsultationHistory.init({
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
    psychologistId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "psychologists",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    bdmId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "agents",
            key: "id",
        },
        onDelete: "SET NULL",
        defaultValue: null,
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    callerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    serviceInterested: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    consultationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("Scheduled", "In Progress", "Completed", "Cancelled"),
        defaultValue: "Scheduled",
    },
    sessionDurationInSeconds: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    followUpCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    recommendations: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: "",
    },
    patientAssessment: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: "",
    },
    averageRating: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5,
        },
    },
    sessionNotes: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
    },
    feedbackHistory: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
    },
    consultationStartedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    consultationEndedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: database_1.default,
    modelName: "ConsultationHistory",
    tableName: "consultation_histories",
    timestamps: true,
});
exports.default = ConsultationHistory;
