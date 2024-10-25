import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

export const WorkFlowJobEntitie = sequelize.define("WorkFlowJobEntitie", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    job_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    run_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    workflow_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    head_branch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    run_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    run_attempt: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    node_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    html_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING, allowNull: true
    },
    conclusion: {
        type: DataTypes.STRING, allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    steps: {
        type: DataTypes.JSON,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    paranoid: false,
    tableName: 'workflow_jobs',
    timestamps: true,
    freezeTableName: true
})