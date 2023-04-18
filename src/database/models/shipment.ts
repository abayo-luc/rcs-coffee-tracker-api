import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

type ShipmentStatus =
  | 'PENDING'
  | 'IN_TRANSIT'
  | 'DELIVERED';

export class Shipment extends Model {
  public id!: string;
  public shipmentId!: string;
  public origin!: string;
  public destination!: string;
  public quantity!: number;
  public status?: ShipmentStatus;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}
Shipment.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    shipmentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    origin: {
      type: DataTypes.STRING,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'PENDING',
        'IN_TRANSIT',
        'DELIVERED'
      ),
      defaultValue: 'PENDING',
    },
  },
  {
    sequelize,
    modelName: 'Shipment',
    tableName: 'shipments',
    timestamps: true,
    hooks: {
      async beforeValidate(attribute, options) {
        if (!attribute.shipmentId) {
          const shipmentCounter =
            await await Shipment.count();
          attribute.shipmentId =
            'SHP' +
            `${shipmentCounter + 1}`.padStart(6, '0');
        }
      },
    },
  }
);
