import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

export class Producer extends Model {
  public id!: string;
  public name!: string;
  public country!: string;
  public region?: string;
  public address?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Producer.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Producer',
    tableName: 'producers',
    timestamps: true,
  }
);
