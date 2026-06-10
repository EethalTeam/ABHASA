import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface ServiceTypeAttributes {
  id: string;

  name: string;
  code: string | null;

  description: string | null;

  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type ServiceTypeCreationAttributes = Optional<
  ServiceTypeAttributes,
  "id" | "code" | "description" | "isActive"
>;

class ServiceType
  extends Model<ServiceTypeAttributes, ServiceTypeCreationAttributes>
  implements ServiceTypeAttributes
{
  public id!: string;

  public name!: string;
  public code!: string | null;

  public description!: string | null;

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ServiceType.init(
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

    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
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
    modelName: "ServiceType",
    tableName: "service_types",
    timestamps: true,
  }
);

export default ServiceType;