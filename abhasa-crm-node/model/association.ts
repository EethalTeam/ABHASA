import Country from "./mastermodel/country.model";
import State from "./mastermodel/state.model";
import City from "./mastermodel/city.model";

import Transaction from "./mastermodel/transaction.model";
import TransactionStatus from "./mastermodel/transactionstatus.model";
import TransactionMethod from "./mastermodel/transactionmethod.model";

/**
 * COUNTRY -> STATE
 */
Country.hasMany(State, {
  foreignKey: "countryId",
});

State.belongsTo(Country, {
  foreignKey: "countryId",
});

/**
 * STATE -> CITY
 */
State.hasMany(City, {
  foreignKey: "stateId",
});

City.belongsTo(State, {
  foreignKey: "stateId",
});

/**
 * TRANSACTION STATUS -> TRANSACTION
 */
TransactionStatus.hasMany(Transaction, {
  foreignKey: "statusId",
});

Transaction.belongsTo(TransactionStatus, {
  foreignKey: "statusId",
});

/**
 * TRANSACTION METHOD -> TRANSACTION
 */
TransactionMethod.hasMany(Transaction, {
  foreignKey: "methodId",
});

Transaction.belongsTo(TransactionMethod, {
  foreignKey: "methodId",
});