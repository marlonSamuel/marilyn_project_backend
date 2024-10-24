import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const Task = sequelize.define("Task", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    parent_id: {type: DataTypes.INTEGER, allowNull: true},
    milestone_id: {type: DataTypes.INTEGER, allowNull: false},
    estimated_hours: {type: DataTypes.INTEGER, allowNull: false},
    hours: {type: DataTypes.INTEGER, allowNull: true},
    assigned_to: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING(200), allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false},
    start_date: {type: DataTypes.DATE, allowNull: false},
    end_date: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'p'},
},{
    paranoid: false,
    tableName: 'tasks',
    timestamps: true,
    freezeTableName: true
})