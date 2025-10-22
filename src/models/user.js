import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    "User",
    {
        user_uuid: {
            type: Datatypes.INTEGER,
            defaultValue: Datatypes.UUIDV4,
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Datatypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        profilePictures: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        gender: {
            type: Datatypes.ENUM("male", "female", "other"),
            allowNull: true,
        },
    },
    {
        timestamps: true,
        tablename: "users",
    }
);

export default User;