import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface TransactionHistoryAttributes {
  id: string;

  transactionId: string;

  fromStatusId?: string | null;
  toStatusId: string;

  reason?: string | null;
  changedBy?: string | null;

  createdAt?: Date;
}

type TransactionHistoryCreationAttributes = Optional<
  TransactionHistoryAttributes,
  "id" | "fromStatusId" | "reason" | "changedBy"
>;

class TransactionHistory
  extends Model<
    TransactionHistoryAttributes,
    TransactionHistoryCreationAttributes
  >
  implements TransactionHistoryAttributes
{
  public id!: string;
  public transactionId!: string;

  public fromStatusId!: string | null;
  public toStatusId!: string;

  public reason!: string | null;
  public changedBy!: string | null;

  public readonly createdAt!: Date;
}

TransactionHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    transactionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fromStatusId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    toStatusId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    changedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TransactionHistory",
    tableName: "transaction_histories",
    timestamps: true,
    updatedAt: false,
  }
);

export default TransactionHistory;