import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from './index';
class User extends Model {
  public id!: string;
  public firstName?: string;
  public lastNme?: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);
