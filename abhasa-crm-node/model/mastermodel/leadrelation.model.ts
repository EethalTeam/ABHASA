// models/LeadRelation.ts

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface LeadRelationAttributes {
  id: string;

  leadId: string;
  sourceId: string;
  statusId: string;
  agentId: string;

  notes?: string | null;

  assignedAt?: Date;
  closedAt?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}

type LeadRelationCreationAttributes = Optional<
  LeadRelationAttributes,
  | "id"
  | "notes"
  | "assignedAt"
  | "closedAt"
>;

class LeadRelation
  extends Model<
    LeadRelationAttributes,
    LeadRelationCreationAttributes
  >
  implements LeadRelationAttributes
{
  public id!: string;

  public leadId!: string;
  public sourceId!: string;
  public statusId!: string;
  public agentId!: string;

  public notes!: string | null;

  public assignedAt!: Date;
  public closedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LeadRelation.init(
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
      onUpdate: "CASCADE",
    },

    sourceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "sources",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "statuses",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    agentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "agents",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "LeadRelation",
    tableName: "lead_relations",
    timestamps: true,
  }
);

export default LeadRelation;