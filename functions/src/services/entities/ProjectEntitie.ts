import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const Project = sequelize.define("Project", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING(200), allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false},
    start_date: {type: DataTypes.DATE, allowNull: false},
    end_date: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'p'},
    enviroment: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'd'},
},{
    paranoid: false,
    tableName: 'projects',
    timestamps: true,
    freezeTableName: true
})