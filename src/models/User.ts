import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';  // Import your sequelize instance

// Define the interface for the User model
interface UserAttributes {
  userID: number;
  userName: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for creating a user (optional properties for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'userID'> {}

// Create the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userID!: number;
  public userName!: string;
  public password!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model
User.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,  // Sequelize instance
    tableName: 'user',
    timestamps: true,
  }
);

export default User;
