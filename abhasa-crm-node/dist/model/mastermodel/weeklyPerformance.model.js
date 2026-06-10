"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class WeeklyPerformance extends sequelize_1.Model {
}
WeeklyPerformance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    agentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    agentName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    month: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 12,
        },
    },
    week: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 4,
        },
    },
    callsHandled: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    leadsConverted: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    consultationBookings: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    revenueContribution: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    avgSentimentScore: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    performanceGrade: {
        type: sequelize_1.DataTypes.ENUM("Excellent", "Good", "Average", "Poor"),
        defaultValue: "Average",
    },
    serviceBreakdown: {
        type: sequelize_1.DataTypes.JSONB,
        defaultValue: [],
    },
}, {
    sequelize: database_1.default,
    modelName: "WeeklyPerformance",
    tableName: "weekly_performance",
    timestamps: true,
});
exports.default = WeeklyPerformance;
