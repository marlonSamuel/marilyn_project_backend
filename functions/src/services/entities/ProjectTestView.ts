import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const ProjectTestView = sequelize.define("ProjectTestView", {
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    name: {type: DataTypes.STRING(200), allowNull: false},
    total_cases: {type: DataTypes.INTEGER, allowNull: false},
    pending_cases: {type: DataTypes.INTEGER, allowNull: false},
    success_cases: {type: DataTypes.INTEGER, allowNull: false},
    fail_cases: {type: DataTypes.INTEGER, allowNull: false},
    total_defects: {type: DataTypes.INTEGER, allowNull: false},
    defect_hours: {type: DataTypes.INTEGER, allowNull: false},
    pending_defects: {type: DataTypes.INTEGER, allowNull: false},
    inprogress_defects: {type: DataTypes.INTEGER, allowNull: false},
    completed_defects: {type: DataTypes.INTEGER, allowNull: false},
    reopens_defects: {type: DataTypes.INTEGER, allowNull: false},
},{
    paranoid: false,
    tableName: 'metrics_test_project',
    timestamps: false,    // Deshabilita los timestamps si no son necesarios
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // No pluraliza el nombre de la vista
    underscored: true, 
})