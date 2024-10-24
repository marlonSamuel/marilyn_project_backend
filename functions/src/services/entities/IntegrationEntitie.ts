import { sequelize } from "../../common/mysql.persistence";

// integration.model.js
const { DataTypes } = require('sequelize');

export const Integration = sequelize.define('Integration', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    projectId: {type: DataTypes.INTEGER, allowNull: false}, //llave foranea referencia a la tabla projects(id)
    ref: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    _before: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    _after: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repositoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    repositoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repositoryFullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pusherName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pusherEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    commitMessage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    commitTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    commitId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    commitUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    }, {
        paranoid: false,
        tableName: 'integrations',
        timestamps: true,
        freezeTableName: true
});
