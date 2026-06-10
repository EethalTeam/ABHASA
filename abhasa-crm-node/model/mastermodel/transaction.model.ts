import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface TransactionAttributes {
  id: string;

  referenceId: string; // booking/payment/refund reference
  type: "BOOKING" | "PAYMENT" | "REFUND";

  statusId: string; // FK → TransactionStatus
  methodId: string; // FK → TransactionMethod

  amount: number;
  currency?: string;

  createdBy?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

type TransactionCreationAttributes = Optional<
  TransactionAttributes,
  "id" | "currency" | "createdBy"
>;

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: string;
  public referenceId!: string;
  public type!: "BOOKING" | "PAYMENT" | "REFUND";

  public statusId!: string;
  public methodId!: string;

  public amount!: number;
  public currency!: string;

  public createdBy!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    referenceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("BOOKING", "PAYMENT", "REFUND"),
      allowNull: false,
    },

    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "transaction_statuses",
        key: "id",
      },
    },

    methodId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "transaction_methods",
        key: "id",
      },
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      defaultValue: "INR",
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

export default Transaction;