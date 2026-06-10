import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";


interface FollowUpAttributes {
  id: string;

  leadId: string;

  patientName: string;
  callerName: string;
  phone: string;

  serviceInterested: string;
  city?: string;

  status: "Open" | "Converted" | "Lost";

  temperature: "Hot" | "Warm" | "Cold";

  followUpAssignedTo: string;

  followUpDate: Date;

  followUpStatus:
    | "Pending"
    | "Called"
    | "Not Reachable"
    | "Converted"
    | "Rescheduled";

  followUpRemarks?: string;

  rescheduledDate?: Date | null;

  updatedBy?: string | null;

  isActive?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type FollowUpCreationAttributes = Optional<
  FollowUpAttributes,
  | "id"
  | "city"
  | "status"
  | "temperature"
  | "followUpStatus"
  | "followUpRemarks"
  | "rescheduledDate"
  | "updatedBy"
  | "isActive"
>;

class FollowUp
  extends Model<
    FollowUpAttributes,
    FollowUpCreationAttributes
  >
  implements FollowUpAttributes
{
  public id!: string;

  public leadId!: string;

  public patientName!: string;
  public callerName!: string;
  public phone!: string;

  public serviceInterested!: string;
  public city!: string;

  public status!: FollowUpAttributes["status"];

  public temperature!: FollowUpAttributes["temperature"];

  public followUpAssignedTo!: string;

  public followUpDate!: Date;

  public followUpStatus!: FollowUpAttributes["followUpStatus"];

  public followUpRemarks!: string;

  public rescheduledDate!: Date | null;

  public updatedBy!: string | null;

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FollowUp.init(
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

    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    callerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    serviceInterested: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },

    status: {
      type: DataTypes.ENUM(
        "Open",
        "Converted",
        "Lost"
      ),
      allowNull: false,
      defaultValue: "Open",
    },

    temperature: {
      type: DataTypes.ENUM(
        "Hot",
        "Warm",
        "Cold"
      ),
      allowNull: false,
      defaultValue: "Warm",
    },

    followUpAssignedTo: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    followUpDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    followUpStatus: {
      type: DataTypes.ENUM(
        "Pending",
        "Called",
        "Not Reachable",
        "Converted",
        "Rescheduled"
      ),
      allowNull: false,
      defaultValue: "Pending",
    },

    followUpRemarks: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },

    rescheduledDate: {
      type: DataTypes.DATE,
      allowNull: true,
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

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "FollowUp",
    tableName: "follow_ups",
    timestamps: true,
  }
);

export default FollowUp;