import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface ConsultationStatusAttributes {
  id: string;

  code: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";
  name: string;

  description?: string | null;

  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type ConsultationStatusCreationAttributes = Optional<
  ConsultationStatusAttributes,
  "id" | "description" | "isActive"
>;

class ConsultationStatus
  extends Model<
    ConsultationStatusAttributes,
    ConsultationStatusCreationAttributes
  >
  implements ConsultationStatusAttributes
{
  public id!: string;

  public code!: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";
  public name!: string;

  public description!: string | null;

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ConsultationStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    code: {
      type: DataTypes.ENUM(
        "SCHEDULED",
        "COMPLETED",
        "CANCELLED",
        "RESCHEDULED",
        "NO_SHOW"
      ),
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
    modelName: "ConsultationStatus",
    tableName: "consultation_statuses",
    timestamps: true,
  }
);

export default ConsultationStatus;