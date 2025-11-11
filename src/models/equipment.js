
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const Equipment = sequelize.define(
    "Equipment",
    {
        equipment_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,

        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type:DataTypes.ENUM("tractor", "harvester", "plough", "sprayer", "other"),
            allowNull:false,
        },
        pricePerDay: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        availability: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users", 
                key: "user_uuid",
            },
        },
    },
    {
        timestamps: true,
        tablename: "equipment",
    }   
);

export default Equipment;