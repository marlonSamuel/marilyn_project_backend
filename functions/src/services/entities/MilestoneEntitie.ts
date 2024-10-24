import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const Milestone = sequelize.define("Milestone", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    project_id: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING(200), allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false},
    start_date: {type: DataTypes.DATE, allowNull: false},
    end_date: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'p'},
},{
    paranoid: false,
    tableName: 'milestones',
    timestamps: true,
    freezeTableName: true
})