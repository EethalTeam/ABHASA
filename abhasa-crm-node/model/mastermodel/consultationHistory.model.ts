import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";


interface SessionNote {
  note: string;
  timestamp?: Date;
  createdBy?: string | null;
}

interface FeedbackHistory {
  rating?: number;
  feedback?: string;
  submittedAt?: Date;
}

interface ConsultationHistoryAttributes {
  id: string;
  leadId: string;
  psychologistId: string;
  bdmId?: string | null;

  patientName: string;
  callerName?: string | null;
  serviceInterested: string;
  consultationDate: Date;

  status:
    | "Scheduled"
    | "In Progress"
    | "Completed"
    | "Cancelled";

  sessionDurationInSeconds?: number;
  followUpCount?: number;
  recommendations?: string;
  patientAssessment?: string;
  averageRating?: number;

  sessionNotes?: SessionNote[];
  feedbackHistory?: FeedbackHistory[];

  consultationStartedAt?: Date | null;
  consultationEndedAt?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}

type ConsultationHistoryCreationAttributes =
  Optional<
    ConsultationHistoryAttributes,
    | "id"
    | "bdmId"
    | "callerName"
    | "status"
    | "sessionDurationInSeconds"
    | "followUpCount"
    | "recommendations"
    | "patientAssessment"
    | "averageRating"
    | "sessionNotes"
    | "feedbackHistory"
    | "consultationStartedAt"
    | "consultationEndedAt"
  >;

class ConsultationHistory
  extends Model<
    ConsultationHistoryAttributes,
    ConsultationHistoryCreationAttributes
  >
  implements ConsultationHistoryAttributes
{
  public id!: string;
  public leadId!: string;
  public psychologistId!: string;
  public bdmId!: string | null;

  public patientName!: string;
  public callerName!: string | null;
  public serviceInterested!: string;
  public consultationDate!: Date;

  public status!: ConsultationHistoryAttributes["status"];

  public sessionDurationInSeconds!: number;
  public followUpCount!: number;
  public recommendations!: string;
  public patientAssessment!: string;
  public averageRating!: number;

  public sessionNotes!: SessionNote[];
  public feedbackHistory!: FeedbackHistory[];

  public consultationStartedAt!: Date | null;
  public consultationEndedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ConsultationHistory.init(
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
    bdmId: {
  type: DataTypes.UUID,
  allowNull: true,
  references: {
    model: "agents",
    key: "id",
  },
  onDelete: "SET NULL",
  defaultValue: null,
},

    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    callerName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    serviceInterested: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    consultationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "Scheduled",
        "In Progress",
        "Completed",
        "Cancelled"
      ),
      defaultValue: "Scheduled",
    },

    sessionDurationInSeconds: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    followUpCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    recommendations: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },

    patientAssessment: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },

    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },

    sessionNotes: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },

    feedbackHistory: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },

    consultationStartedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    consultationEndedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "ConsultationHistory",
    tableName: "consultation_histories",
    timestamps: true,
  }
);

export default ConsultationHistory;