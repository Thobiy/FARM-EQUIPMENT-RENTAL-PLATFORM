
import User from "./user.js";
import Equipment from ",/equipment.js";
import Rental from "./rental.js";


//Relationships
User.hasMany(Rental, { foriegnKey: "userId" });
Rental.belongsTo(User, { foreignKey: "userId" });

Equipment.hasMany(Rental, { foreignKey: "equipmentId" });
Rental.belongsTo(Equipment, { foreignKey: "equipmentId" });

export {User, Equipment, Rental };
