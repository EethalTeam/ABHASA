import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface GenderAttributes {
  id: string;
  code: string; // MALE, FEMALE, OTHER
  name: string; // Male, Female, Other
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type GenderCreationAttributes = Optional<
  GenderAttributes,
  "id" | "isActive"
>;

class Gender
  extends Model<GenderAttributes, GenderCreationAttributes>
  implements GenderAttributes
{
  public id!: string;
  public code!: string;
  public name!: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Gender.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Gender",
    tableName: "genders",
    timestamps: true,
  }
);

export default Gender;