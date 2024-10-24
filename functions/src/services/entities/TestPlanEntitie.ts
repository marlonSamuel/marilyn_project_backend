import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const TestPlan = sequelize.define("TestPlan", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    project_id: {type: DataTypes.INTEGER, allowNull: true},
    assigned_to: {type: DataTypes.INTEGER, allowNull: false},
    created_by: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING(200), allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false},
    acceptance_criteria: {type: DataTypes.STRING(200), allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'p'},
},{
    paranoid: false,
    tableName: 'test_plans',
    timestamps: true,
    freezeTableName: true
})