import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const TestScenario = sequelize.define("TestScenario", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    testplan_id: {type: DataTypes.INTEGER, allowNull: true},
    name: {type: DataTypes.STRING(200), allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'p'},
},{
    paranoid: false,
    tableName: 'test_scenarios',
    timestamps: true,
    freezeTableName: true
})