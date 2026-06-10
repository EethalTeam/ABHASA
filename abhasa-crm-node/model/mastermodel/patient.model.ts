import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface PatientAttributes {
  id: string;

  patientName: string;
  callerName: string;

  relationship:
    | "Self"
    | "Mother"
    | "Father"
    | "Spouse"
    | "Friend";

  phone: string;
  alternatePhone?: string | null;
  email?: string | null;

  dateOfBirth?: Date | null;
  gender?: string | null;

  address?: string | null;
  city?: string | null;

  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactRelationship?: string | null;

  diagnosis?: string | null;
  referralSource?: string | null;

  consultationStatus:
    | "Scheduled"
    | "Completed"
    | "Cancelled";

  paymentStatus:
    | "Pending"
    | "Paid"
    | "Refunded";

  psychologistAssigned?: string | null;
  assignedBDM?: string | null;

  lastConsultation?: Date | null;
}

type PatientCreationAttributes = Optional<
  PatientAttributes,
  | "id"
  | "alternatePhone"
  | "email"
  | "dateOfBirth"
  | "gender"
  | "address"
  | "city"
  | "emergencyContactName"
  | "emergencyContactPhone"
  | "emergencyContactRelationship"
  | "diagnosis"
  | "referralSource"
  | "consultationStatus"
  | "paymentStatus"
  | "psychologistAssigned"
  | "assignedBDM"
  | "lastConsultation"
>;

class Patient
  extends Model<
    PatientAttributes,
    PatientCreationAttributes
  >
  implements PatientAttributes
{
  public id!: string;

  public patientName!: string;
  public callerName!: string;

  public relationship!:
    | "Self"
    | "Mother"
    | "Father"
    | "Spouse"
    | "Friend";

  public phone!: string;
  public alternatePhone!: string | null;
  public email!: string | null;

  public dateOfBirth!: Date | null;
  public gender!: string | null;

  public address!: string | null;
  public city!: string | null;

  public emergencyContactName!: string | null;
  public emergencyContactPhone!: string | null;
  public emergencyContactRelationship!: string | null;

  public diagnosis!: string | null;
  public referralSource!: string | null;

  public consultationStatus!:
    | "Scheduled"
    | "Completed"
    | "Cancelled";

  public paymentStatus!:
    | "Pending"
    | "Paid"
    | "Refunded";

  public psychologistAssigned!: string | null;
  public assignedBDM!: string | null;

  public lastConsultation!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    callerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    relationship: {
      type: DataTypes.ENUM(
        "Self",
        "Mother",
        "Father",
        "Spouse",
        "Friend"
      ),
      defaultValue: "Self",
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    alternatePhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emergencyContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emergencyContactRelationship: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    referralSource: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    consultationStatus: {
      type: DataTypes.ENUM(
        "Scheduled",
        "Completed",
        "Cancelled"
      ),
      defaultValue: "Scheduled",
    },

    paymentStatus: {
      type: DataTypes.ENUM(
        "Pending",
        "Paid",
        "Refunded"
      ),
      defaultValue: "Pending",
    },

    psychologistAssigned: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    assignedBDM: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    lastConsultation: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
    timestamps: true,
  }
);

export default Patient;