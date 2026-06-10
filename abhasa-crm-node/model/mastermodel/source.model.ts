import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface SourceAttributes {
  id: string;

  name: string;
  description: string | null;

  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type SourceCreationAttributes = Optional<
  SourceAttributes,
  "id" | "description" | "isActive"
>;

class Source
  extends Model<SourceAttributes, SourceCreationAttributes>
  implements SourceAttributes
{
  public id!: string;

  public name!: string;
  public description!: string | null;

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Source.init(
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
    modelName: "Source",
    tableName: "sources",
    timestamps: true,
  }
);

export default Source;