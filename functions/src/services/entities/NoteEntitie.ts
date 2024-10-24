import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const Note = sequelize.define("Note", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    task_id: {type: DataTypes.INTEGER, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false}
},{
    paranoid: false,
    tableName: 'notes',
    timestamps: true,
    freezeTableName: true
})