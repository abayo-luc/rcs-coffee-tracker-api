import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

export class Supplier extends Model {
  public id!: string;
  public name!: string;
  public country?: string;
  public region?: string;
  public address?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  static associate(models: any) {
    // define association here
  }
}
Supplier.init(
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
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Supplier',
    tableName: 'suppliers',
    timestamps: true,
  }
);
