import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface StateAttributes {
  id: string;
  name: string;
  countryId: string;   // FK instead of string

  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type StateCreationAttributes = Optional<
  StateAttributes,
  "id" | "isActive"
>;

class State
  extends Model<StateAttributes, StateCreationAttributes>
  implements StateAttributes
{
  public id!: string;
  public name!: string;
  public countryId!: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

State.init(
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

    countryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "countries",
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
    modelName: "State",
    tableName: "states",
    timestamps: true,
  }
);

export default State;