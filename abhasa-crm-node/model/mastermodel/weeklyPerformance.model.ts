import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface ServiceBreakdown {
  service: string;
  calls: number;
  conversions: number;
}

interface WeeklyPerformanceAttributes {
  id: string;

  agentId: string;
  agentName: string;

  year: number;
  month: number;
  week: 1 | 2 | 3 | 4;

  callsHandled: number;
  leadsConverted: number;
  consultationBookings: number;
  revenueContribution: number;

  avgSentimentScore: number;

  performanceGrade:
    | "Excellent"
    | "Good"
    | "Average"
    | "Poor";

  serviceBreakdown?: ServiceBreakdown[];
}

type WeeklyPerformanceCreationAttributes = Optional<
  WeeklyPerformanceAttributes,
  | "id"
  | "callsHandled"
  | "leadsConverted"
  | "consultationBookings"
  | "revenueContribution"
  | "avgSentimentScore"
  | "performanceGrade"
  | "serviceBreakdown"
>;

class WeeklyPerformance
  extends Model<
    WeeklyPerformanceAttributes,
    WeeklyPerformanceCreationAttributes
  >
  implements WeeklyPerformanceAttributes
{
  public id!: string;

  public agentId!: string;
  public agentName!: string;

  public year!: number;
  public month!: number;
  public week!: 1 | 2 | 3 | 4;

  public callsHandled!: number;
  public leadsConverted!: number;
  public consultationBookings!: number;
  public revenueContribution!: number;

  public avgSentimentScore!: number;

  public performanceGrade!:
    | "Excellent"
    | "Good"
    | "Average"
    | "Poor";

  public serviceBreakdown!: ServiceBreakdown[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WeeklyPerformance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    agentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    agentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },

    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 4,
      },
    },

    callsHandled: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    leadsConverted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    consultationBookings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    revenueContribution: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    avgSentimentScore: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    performanceGrade: {
      type: DataTypes.ENUM(
        "Excellent",
        "Good",
        "Average",
        "Poor"
      ),
      defaultValue: "Average",
    },

    serviceBreakdown: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "WeeklyPerformance",
    tableName: "weekly_performance",
    timestamps: true,
  }
);

export default WeeklyPerformance;