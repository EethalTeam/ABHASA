import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";
interface AIInsights {
  sentiment?: "Positive" | "Neutral" | "Negative" | null;
  intent?: string | null;
  outcome?:
    | "Converted"
    | "Follow-up"
    | "Callback"
    | "Not Interested"
    | null;
  summary?: string | null;
  improvementNotes?: string | null;
  nextAction?: string | null;
  leadScore?: number;
}

interface CallAttributes {
  id: string;
  leadId: string;
  patientId?: string | null;
  agentId: string;
  duration?: number;
  timestamp?: Date;
  aiInsights?: AIInsights;

  createdAt?: Date;
  updatedAt?: Date;
}

type CallCreationAttributes = Optional<
  CallAttributes,
  | "id"
  | "patientId"
  | "duration"
  | "timestamp"
  | "aiInsights"
>;

class Call
  extends Model<CallAttributes, CallCreationAttributes>
  implements CallAttributes
{
  public id!: string;
  public leadId!: string;
  public patientId!: string | null;
  public agentId!: string;
  public duration!: number;
  public timestamp!: Date;
  public aiInsights!: AIInsights;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Call.init(
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

    patientId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "leads",
        key: "id",
      },
      onDelete: "SET NULL",
      defaultValue: null,
    },

    agentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "agents",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    aiInsights: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        sentiment: null,
        intent: null,
        outcome: null,
        summary: null,
        improvementNotes: null,
        nextAction: null,
        leadScore: 0,
      },

      validate: {
        isValidSentiment(value: AIInsights) {
          const valid = [
            "Positive",
            "Neutral",
            "Negative",
          ];

          if (
            value?.sentiment &&
            !valid.includes(value.sentiment)
          ) {
            throw new Error("Invalid sentiment");
          }
        },

        isValidOutcome(value: AIInsights) {
          const valid = [
            "Converted",
            "Follow-up",
            "Callback",
            "Not Interested",
          ];

          if (
            value?.outcome &&
            !valid.includes(value.outcome)
          ) {
            throw new Error("Invalid outcome");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Call",
    tableName: "calls",
    timestamps: true,
  }
);

export default Call;