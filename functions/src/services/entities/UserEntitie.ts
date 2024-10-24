import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';



//id, names, last_names, role, birthday, cellphone, email, password, createdAt, updatedAt

export const User = sequelize.define("User", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING(200), allowNull: false},
    password: {type: DataTypes.STRING(500), allowNull: false},
    first_name: {type: DataTypes.STRING(200), allowNull: false},
    last_name: {type: DataTypes.STRING(200), allowNull: false},
    second_name: {type: DataTypes.STRING(200), allowNull: true},
    second_last_name: {type: DataTypes.STRING(200), allowNull: true},
    birthday: {type: DataTypes.DATEONLY, allowNull: false},
    role: {type: DataTypes.STRING(50), allowNull: false},
},{
    paranoid: false,
    tableName: 'users',
    timestamps: true,
    freezeTableName: true
})