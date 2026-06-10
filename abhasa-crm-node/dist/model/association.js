"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const country_model_1 = __importDefault(require("./mastermodel/country.model"));
const state_model_1 = __importDefault(require("./mastermodel/state.model"));
const city_model_1 = __importDefault(require("./mastermodel/city.model"));
const transaction_model_1 = __importDefault(require("./mastermodel/transaction.model"));
const transactionstatus_model_1 = __importDefault(require("./mastermodel/transactionstatus.model"));
const transactionmethod_model_1 = __importDefault(require("./mastermodel/transactionmethod.model"));
/**
 * COUNTRY -> STATE
 */
country_model_1.default.hasMany(state_model_1.default, {
    foreignKey: "countryId",
});
state_model_1.default.belongsTo(country_model_1.default, {
    foreignKey: "countryId",
});
/**
 * STATE -> CITY
 */
state_model_1.default.hasMany(city_model_1.default, {
    foreignKey: "stateId",
});
city_model_1.default.belongsTo(state_model_1.default, {
    foreignKey: "stateId",
});
/**
 * TRANSACTION STATUS -> TRANSACTION
 */
transactionstatus_model_1.default.hasMany(transaction_model_1.default, {
    foreignKey: "statusId",
});
transaction_model_1.default.belongsTo(transactionstatus_model_1.default, {
    foreignKey: "statusId",
});
/**
 * TRANSACTION METHOD -> TRANSACTION
 */
transactionmethod_model_1.default.hasMany(transaction_model_1.default, {
    foreignKey: "methodId",
});
transaction_model_1.default.belongsTo(transactionmethod_model_1.default, {
    foreignKey: "methodId",
});
