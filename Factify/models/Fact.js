import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Fact = sequelize.define("Fact", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fact: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Fact;
