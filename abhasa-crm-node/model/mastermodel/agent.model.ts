import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

/**
 * AGENT MODEL
 */

interface AgentAttributes {
  id: string;

  name: string;
  email: string;
  phone?: string | null;

  role?: "Admin" | "Manager" | "Agent";

  isActive?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type AgentCreationAttributes = Optional<
  AgentAttributes,
  "id" | "phone" | "role" | "isActive"
>;

class Agent
  extends Model<AgentAttributes, AgentCreationAttributes>
  implements AgentAttributes
{
  public id!: string;

  public name!: string;
  public email!: string;
  public phone!: string | null;

  public role!: AgentAttributes["role"];

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Agent.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    role: {
      type: DataTypes.ENUM("Admin", "Manager", "Agent"),
      defaultValue: "Agent",
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Agent",
    tableName: "agents",
    timestamps: true,
  }
);

export default Agent;