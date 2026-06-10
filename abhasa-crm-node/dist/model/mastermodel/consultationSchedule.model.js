"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class ConsultationSchedule extends sequelize_1.Model {
}
ConsultationSchedule.init({
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
            model: "Users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("Scheduled", "Completed", "Cancelled"),
        allowNull: false,
        defaultValue: "Scheduled",
    },
    createdBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "Users",
            key: "id",
        },
        onDelete: "SET NULL",
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
}, {
    sequelize: database_1.default,
    modelName: "ConsultationSchedule",
    tableName: "consultation_schedules",
    timestamps: true,
});
exports.default = ConsultationSchedule;
