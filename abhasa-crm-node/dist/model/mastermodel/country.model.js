"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../src/config/database"));
class Country extends sequelize_1.Model {
}
Country.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // ⭐ important
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
        unique: true,
        defaultValue: null,
    },
    phoneCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "Country",
    tableName: "countries",
    timestamps: true,
});
exports.default = Country;
