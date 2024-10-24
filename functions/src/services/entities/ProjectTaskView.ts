import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const ProjectTaskView = sequelize.define("ProjectTaskView", {
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    name: {type: DataTypes.STRING(200), allowNull: false},
    enviroment: {type: DataTypes.CHAR(1), allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false},
    total_tasks: {type: DataTypes.INTEGER, allowNull: false},
    pending_tasks: {type: DataTypes.INTEGER, allowNull: false},
    inprogress_tasks: {type: DataTypes.INTEGER, allowNull: false},
    completed_tasks: {type: DataTypes.INTEGER, allowNull: false},
    stopped_tasks: {type: DataTypes.INTEGER, allowNull: false},
    total_hours: {type: DataTypes.INTEGER, allowNull: false},
},{
    paranoid: false,
    tableName: 'metrics_task_project',
    timestamps: false,    // Deshabilita los timestamps si no son necesarios
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // No pluraliza el nombre de la vista
    underscored: true, 
})