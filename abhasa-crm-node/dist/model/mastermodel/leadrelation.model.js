"use strict";
// models/LeadRelation.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class LeadRelation extends sequelize_1.Model {
}
LeadRelation.init({
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
        onUpdate: "CASCADE",
    },
    sourceId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "sources",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    statusId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "statuses",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    agentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "agents",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    assignedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    closedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: database_1.default,
    modelName: "LeadRelation",
    tableName: "lead_relations",
    timestamps: true,
});
exports.default = LeadRelation;
