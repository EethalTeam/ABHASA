import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";


interface ConsultationRoomAttributes {
  id: string;

  leadId: string;
  psychologistId: string;
  consultationId: string;

  sessionNotes?: string;
  patientAssessment?: string;
  followUpCount?: number;
  recommendations?: string;
  sessionDurationInSeconds?: number;

  sessionStartTime?: Date;
  sessionEndTime?: Date | null;

  consultationStatus:
    | "Scheduled"
    | "In Progress"
    | "Completed"
    | "Cancelled";

  feedbackSubmittedBy?: string | null;
  isFeedbackSubmitted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type ConsultationRoomCreationAttributes =
  Optional<
    ConsultationRoomAttributes,
    | "id"
    | "sessionNotes"
    | "patientAssessment"
    | "followUpCount"
    | "recommendations"
    | "sessionDurationInSeconds"
    | "sessionStartTime"
    | "sessionEndTime"
    | "consultationStatus"
    | "feedbackSubmittedBy"
    | "isFeedbackSubmitted"
  >;

class ConsultationRoom
  extends Model<
    ConsultationRoomAttributes,
    ConsultationRoomCreationAttributes
  >
  implements ConsultationRoomAttributes
{
  public id!: string;

  public leadId!: string;
  public psychologistId!: string;
  public consultationId!: string;

  public sessionNotes!: string;
  public patientAssessment!: string;
  public followUpCount!: number;
  public recommendations!: string;
  public sessionDurationInSeconds!: number;

  public sessionStartTime!: Date;
  public sessionEndTime!: Date | null;

  public consultationStatus!: ConsultationRoomAttributes["consultationStatus"];

  public feedbackSubmittedBy!: string | null;
  public isFeedbackSubmitted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ConsultationRoom.init(
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
        model: "psychologists",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    consultationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "consultations",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    sessionNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },

    patientAssessment: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },

    followUpCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },

    recommendations: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },

    sessionDurationInSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    sessionStartTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    sessionEndTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    consultationStatus: {
      type: DataTypes.ENUM(
        "Scheduled",
        "In Progress",
        "Completed",
        "Cancelled"
      ),
      allowNull: false,
      defaultValue: "Scheduled",
    },

    feedbackSubmittedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "SET NULL",
      defaultValue: null,
    },

    isFeedbackSubmitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ConsultationRoom",
    tableName: "consultation_rooms",
    timestamps: true,
  }
);

export default ConsultationRoom;