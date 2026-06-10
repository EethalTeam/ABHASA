"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    referenceId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("BOOKING", "PAYMENT", "REFUND"),
        allowNull: false,
    },
    statusId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "transaction_statuses",
            key: "id",
        },
    },
    methodId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "transaction_methods",
            key: "id",
        },
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "INR",
    },
    createdBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
});
exports.default = Transaction;
