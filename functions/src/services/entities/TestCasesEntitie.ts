import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const TestCase = sequelize.define("TestCase", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    scenario_id: {type: DataTypes.INTEGER, allowNull: true},
    name: {type: DataTypes.STRING(200), allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false},
    test_data: {type: DataTypes.TEXT, allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'p'},
    expected_result: {type: DataTypes.STRING(1000), allowNull: false},
    actual_result: {type: DataTypes.STRING(1000), allowNull: true},
    execution_type: {type: DataTypes.CHAR(1), allowNull: true},
},{
    paranoid: false,
    tableName: 'test_cases',
    timestamps: true,
    freezeTableName: true
})