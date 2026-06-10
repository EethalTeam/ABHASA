"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class Consultation extends sequelize_1.Model {
}
Consultation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    leadId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "leads", // lowercase table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    psychId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "psychologists", // lowercase
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    serviceTypeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "service_types",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("Scheduled", "Completed", "Cancelled"),
        defaultValue: "Scheduled",
        allowNull: false,
    },
    cancellationReason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    rescheduledFrom: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "consultations",
            key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        defaultValue: null,
    },
    refundInitiated: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    refundLink: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    bookedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: database_1.default,
    modelName: "Consultation",
    tableName: "consultations",
    timestamps: true,
});
exports.default = Consultation;
