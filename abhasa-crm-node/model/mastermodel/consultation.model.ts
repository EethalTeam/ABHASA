import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface ConsultationAttributes {
  id: string;
  leadId: string;
  psychId: string;

serviceTypeId: string;
  datetime: Date;

  status:
    | "Scheduled"
    | "Completed"
    | "Cancelled";

  cancellationReason?: string | null;
  rescheduledFrom?: string | null;
  refundInitiated?: boolean;
  refundLink?: string | null;
  bookedBy?: string | null;
  updatedBy?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

type ConsultationCreationAttributes = Optional<
  ConsultationAttributes,
  | "id"
  | "status"
  | "cancellationReason"
  | "rescheduledFrom"
  | "refundInitiated"
  | "refundLink"
  | "bookedBy"
  | "updatedBy"
>;

class Consultation
  extends Model<
    ConsultationAttributes,
    ConsultationCreationAttributes
  >
  implements ConsultationAttributes
{
  public id!: string;
  public leadId!: string;
  public psychId!: string;
  public serviceTypeId!: string;
  public datetime!: Date;
  public status!: ConsultationAttributes["status"];

  public cancellationReason!: string | null;
  public rescheduledFrom!: string | null;

  public refundInitiated!: boolean;
  public refundLink!: string | null;

  public bookedBy!: string | null;
  public updatedBy!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Consultation.init(
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
        model: "leads", // lowercase table name
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    psychId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "psychologists", // lowercase
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    serviceTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "service_types",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
      defaultValue: "Scheduled",
      allowNull: false,
    },

    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    rescheduledFrom: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "consultations",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      defaultValue: null,
    },

    refundInitiated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    refundLink: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    bookedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },

    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Consultation",
    tableName: "consultations",
    timestamps: true,
  }
);

export default Consultation;