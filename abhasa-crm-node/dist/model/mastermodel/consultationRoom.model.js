"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class ConsultationRoom extends sequelize_1.Model {
}
ConsultationRoom.init({
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
    consultationId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "consultations",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    sessionNotes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    patientAssessment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    followUpCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
        },
    },
    recommendations: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    sessionDurationInSeconds: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    sessionStartTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    sessionEndTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    consultationStatus: {
        type: sequelize_1.DataTypes.ENUM("Scheduled", "In Progress", "Completed", "Cancelled"),
        allowNull: false,
        defaultValue: "Scheduled",
    },
    feedbackSubmittedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "Users",
            key: "id",
        },
        onDelete: "SET NULL",
        defaultValue: null,
    },
    isFeedbackSubmitted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "ConsultationRoom",
    tableName: "consultation_rooms",
    timestamps: true,
});
exports.default = ConsultationRoom;
