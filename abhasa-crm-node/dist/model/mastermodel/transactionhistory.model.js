"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class TransactionHistory extends sequelize_1.Model {
}
TransactionHistory.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    transactionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    fromStatusId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    toStatusId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    reason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    changedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "TransactionHistory",
    tableName: "transaction_histories",
    timestamps: true,
    updatedAt: false,
});
exports.default = TransactionHistory;
