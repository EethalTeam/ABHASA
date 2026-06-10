import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../../src/config/database";

interface PsychologistAttributes {
  id: string;
  name: string;
  specialization: string;
  avgRating?: number;
  workload?: number;
  email?: string | null;
  phone?: string | null;
  experience?: number;
  isActive?: boolean;
}

type PsychologistCreationAttributes = Optional<
  PsychologistAttributes,
  | "id"
  | "avgRating"
  | "workload"
  | "email"
  | "phone"
  | "experience"
  | "isActive"
>;

class Psychologist
  extends Model<
    PsychologistAttributes,
    PsychologistCreationAttributes
  >
  implements PsychologistAttributes
{
  public id!: string;
  public name!: string;
  public specialization!: string;
  public avgRating!: number;
  public workload!: number;
  public email!: string | null;
  public phone!: string | null;
  public experience!: number;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Psychologist.init(
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

    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    avgRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    workload: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Psychologist",
    tableName: "psychologists",
    timestamps: true,
  }
);

export default Psychologist;