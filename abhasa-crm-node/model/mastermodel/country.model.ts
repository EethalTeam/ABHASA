import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface CountryAttributes {
  id: string;
  name: string;
  code: string | null;
  phoneCode: string | null;
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type CountryCreationAttributes = Optional<
  CountryAttributes,
  "id" | "code" | "phoneCode" | "isActive"
>;

class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  public id!: string;
  public name!: string;
  public code!: string | null;
  public phoneCode!: string | null;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Country.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,   // ⭐ important
    },

    code: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: true,
      defaultValue: null,
    },

    phoneCode: {
      type: DataTypes.STRING(10),
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
    modelName: "Country",
    tableName: "countries",
    timestamps: true,
  }
);

export default Country;