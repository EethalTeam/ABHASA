import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

/**
 * STATUS MODEL
 */

interface StatusAttributes {
  id: string;

  name: string;
  color?: string | null;
  description?: string | null;

  isActive?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type StatusCreationAttributes = Optional<
  StatusAttributes,
  "id" | "color" | "description" | "isActive"
>;

class Status
  extends Model<StatusAttributes, StatusCreationAttributes>
  implements StatusAttributes
{
  public id!: string;

  public name!: string;
  public color!: string | null;
  public description!: string | null;

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Status.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Status",
    tableName: "statuses",
    timestamps: true,
  }
);

export default Status;