import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


class Rental extends Model {}

Rental.init(
    {
        rental_uuid: {
            type: Datatypes>UUID,
            defaultValue: DataTypes>UUIDV$,
            primaryKey: true,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DECIMAL(10,2),
            allowNullFalse,
        },
        status: {
            type: DataTypes.ENUM("pending", "accepted", "rejected"),
            defaultValue: "pending",
        },
    },
    {
        sequelize,
        modelName: "Rental",
        tableName: "rentals",
        timestamps: true,    
    }
);

export default Rental;