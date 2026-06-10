import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";


interface ConsultationScheduleAttributes {
  id: string;

  leadId: string;
  psychologistId: string;

  datetime: Date;

  status:
    | "Scheduled"
    | "Completed"
    | "Cancelled";

  createdBy?: string | null;
  updatedBy?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

type ConsultationScheduleCreationAttributes =
  Optional<
    ConsultationScheduleAttributes,
    | "id"
    | "status"
    | "createdBy"
    | "updatedBy"
  >;

class ConsultationSchedule
  extends Model<
    ConsultationScheduleAttributes,
    ConsultationScheduleCreationAttributes
  >
  implements ConsultationScheduleAttributes
{
  public id!: string;

  public leadId!: string;
  public psychologistId!: string;

  public datetime!: Date;

  public status!: ConsultationScheduleAttributes["status"];

  public createdBy!: string | null;
  public updatedBy!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ConsultationSchedule.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    leadId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "leads",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    psychologistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "Scheduled",
        "Completed",
        "Cancelled"
      ),
      allowNull: false,
      defaultValue: "Scheduled",
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "SET NULL",
      defaultValue: null,
    },

    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "SET NULL",
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "ConsultationSchedule",
    tableName: "consultation_schedules",
    timestamps: true,
  }
);

export default ConsultationSchedule;