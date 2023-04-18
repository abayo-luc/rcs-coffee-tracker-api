import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from './index';
type UserRole = 'USER' | 'ADMIN';
export class User extends Model {
  public id!: string;
  public firstName?: string;
  public lastNme?: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  public toJSON() {
    const data = Object.assign({}, this.get());
    delete data.password;
    return data;
  }
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    role: {
      allowNull: false,
      type: DataTypes.ENUM('USER', 'ADMIN'),
      defaultValue: 'USER',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate(attributes) {
        if (attributes.password) {
          // should hash the password
        }
      },
    },
  }
);
