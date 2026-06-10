import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";
type TransactionStatusCode = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

interface TransactionStatusAttributes {
  id: string;
  code: TransactionStatusCode;
  name: string;
  isActive: boolean;
}

type TransactionStatusCreationAttributes = Optional<
  TransactionStatusAttributes,
  "id" | "isActive"
>;

class TransactionStatus
  extends Model<TransactionStatusAttributes, TransactionStatusCreationAttributes>
  implements TransactionStatusAttributes
{
  public id!: string;
  public code!: TransactionStatusCode;
  public name!: string;
  public isActive!: boolean;
}

TransactionStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    code: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED", "CANCELLED"),
      unique: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "TransactionStatus",
    tableName: "transaction_statuses",
    timestamps: true,
  }
);

export default TransactionStatus;