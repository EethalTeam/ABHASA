import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface LeadAttributes {
  id: string;

  callerName: string;
  patientName: string;

  relationshipWithPatient: "Self" | "Mother" | "Father" | "Spouse" | "Friend";

  phone: string;
  email?: string | null;

  cityId?: string | null;     // FK → City (MASTER)
  sourceId?: string | null;   // FK → Source (MASTER)

  serviceInterested?: string;

  status: "New" | "Active" | "Converted" | "Lost";

  temperature: "Hot" | "Warm" | "Cold";

  leadScore: number;

  assignedAgent?: string | null;
  psychologistAssigned?: string | null;

  consultationStatus: "Scheduled" | "Completed" | "Cancelled";

  paymentStatus: "Pending" | "Paid" | "Refunded";

  followUpAssignedTo?: string | null;
  followUpDate?: Date | null;

  followUpStatus: "Pending" | "Called" | "Not Reachable" | "Converted" | "Rescheduled";

  lastActivity?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

type LeadCreationAttributes = Optional<
  LeadAttributes,
  | "id"
  | "email"
  | "cityId"
  | "sourceId"
  | "serviceInterested"
  | "status"
  | "temperature"
  | "leadScore"
  | "assignedAgent"
  | "psychologistAssigned"
  | "consultationStatus"
  | "paymentStatus"
  | "followUpAssignedTo"
  | "followUpDate"
  | "followUpStatus"
  | "lastActivity"
>;

class Lead
  extends Model<LeadAttributes, LeadCreationAttributes>
  implements LeadAttributes
{
  public id!: string;

  public callerName!: string;
  public patientName!: string;

  public relationshipWithPatient!: LeadAttributes["relationshipWithPatient"];

  public phone!: string;
  public email!: string | null;

  public cityId!: string | null;
  public sourceId!: string | null;

  public serviceInterested!: string;

  public status!: LeadAttributes["status"];
  public temperature!: LeadAttributes["temperature"];

  public leadScore!: number;

  public assignedAgent!: string | null;
  public psychologistAssigned!: string | null;

  public consultationStatus!: LeadAttributes["consultationStatus"];
  public paymentStatus!: LeadAttributes["paymentStatus"];

  public followUpAssignedTo!: string | null;
  public followUpDate!: Date | null;
  public followUpStatus!: LeadAttributes["followUpStatus"];

  public lastActivity!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lead.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    callerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    relationshipWithPatient: {
      type: DataTypes.ENUM("Self", "Mother", "Father", "Spouse", "Friend"),
      defaultValue: "Self",
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "cities",
        key: "id",
      },
      onDelete: "SET NULL",
    },

    sourceId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "sources",
        key: "id",
      },
      onDelete: "SET NULL",
    },

    serviceInterested: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("New", "Active", "Converted", "Lost"),
      defaultValue: "New",
    },

    temperature: {
      type: DataTypes.ENUM("Hot", "Warm", "Cold"),
      defaultValue: "Warm",
    },

    leadScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    assignedAgent: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    psychologistAssigned: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    consultationStatus: {
      type: DataTypes.ENUM("Scheduled", "Completed", "Cancelled"),
      defaultValue: "Scheduled",
    },

    paymentStatus: {
      type: DataTypes.ENUM("Pending", "Paid", "Refunded"),
      defaultValue: "Pending",
    },

    followUpAssignedTo: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    followUpDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    followUpStatus: {
      type: DataTypes.ENUM(
        "Pending",
        "Called",
        "Not Reachable",
        "Converted",
        "Rescheduled"
      ),
      defaultValue: "Pending",
    },

    lastActivity: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Lead",
    tableName: "leads",
    timestamps: true,
  }
);

export default Lead;