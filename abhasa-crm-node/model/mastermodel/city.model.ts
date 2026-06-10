import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface CityAttributes {
  id: string;
  name: string;

  stateId: string;   // FK instead of string
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type CityCreationAttributes = Optional<
  CityAttributes,
  "id" | "isActive"
>;

class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  public id!: string;
  public name!: string;
  public stateId!: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

City.init(
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

    stateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "states",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "City",
    tableName: "cities",
    timestamps: true,
  }
);

export default City;