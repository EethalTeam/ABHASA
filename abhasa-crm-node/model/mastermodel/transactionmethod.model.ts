import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

type TransactionMethodCode = "UPI" | "CARD" | "CASH" | "NETBANKING";

interface TransactionMethodAttributes {
  id: string;
  code: TransactionMethodCode;
  name: string;
  description?: string | null;
  isActive: boolean;
}

type TransactionMethodCreationAttributes = Optional<
  TransactionMethodAttributes,
  "id" | "description" | "isActive"
>;

class TransactionMethod
  extends Model<TransactionMethodAttributes, TransactionMethodCreationAttributes>
  implements TransactionMethodAttributes
{
  public id!: string;
  public code!: TransactionMethodCode;
  public name!: string;
  public description!: string | null;
  public isActive!: boolean;
}

TransactionMethod.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    code: {
      type: DataTypes.ENUM("UPI", "CARD", "CASH", "NETBANKING"),
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "TransactionMethod",
    tableName: "transaction_methods",
    timestamps: true,
  }
);

export default TransactionMethod;