import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../src/config/database";

interface PatientStatusAttributes {
  id: string;

  code: "ACTIVE" | "INACTIVE" | "RECOVERED" | "UNDER_TREATMENT" | "DISCHARGED";
  name: string;

  description?: string | null;

  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

type PatientStatusCreationAttributes = Optional<
  PatientStatusAttributes,
  "id" | "description" | "isActive"
>;

class PatientStatus
  extends Model<PatientStatusAttributes, PatientStatusCreationAttributes>
  implements PatientStatusAttributes
{
  public id!: string;

  public code!: "ACTIVE" | "INACTIVE" | "RECOVERED" | "UNDER_TREATMENT" | "DISCHARGED";
  public name!: string;

  public description!: string | null;

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PatientStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    code: {
      type: DataTypes.ENUM(
        "ACTIVE",
        "INACTIVE",
        "RECOVERED",
        "UNDER_TREATMENT",
        "DISCHARGED"
      ),
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "PatientStatus",
    tableName: "patient_statuses",
    timestamps: true,
  }
);

export default PatientStatus;