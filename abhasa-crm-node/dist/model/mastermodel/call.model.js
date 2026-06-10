"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class Call extends sequelize_1.Model {
}
Call.init({
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
    patientId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "leads",
            key: "id",
        },
        onDelete: "SET NULL",
        defaultValue: null,
    },
    agentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "agents",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    aiInsights: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
            sentiment: null,
            intent: null,
            outcome: null,
            summary: null,
            improvementNotes: null,
            nextAction: null,
            leadScore: 0,
        },
        validate: {
            isValidSentiment(value) {
                const valid = [
                    "Positive",
                    "Neutral",
                    "Negative",
                ];
                if (value?.sentiment &&
                    !valid.includes(value.sentiment)) {
                    throw new Error("Invalid sentiment");
                }
            },
            isValidOutcome(value) {
                const valid = [
                    "Converted",
                    "Follow-up",
                    "Callback",
                    "Not Interested",
                ];
                if (value?.outcome &&
                    !valid.includes(value.outcome)) {
                    throw new Error("Invalid outcome");
                }
            },
        },
    },
}, {
    sequelize: database_1.default,
    modelName: "Call",
    tableName: "calls",
    timestamps: true,
});
exports.default = Call;
