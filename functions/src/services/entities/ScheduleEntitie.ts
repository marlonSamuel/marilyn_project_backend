import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';


//id, names, last_names, role, birthday, cellphone, email, password, createdAt, updatedAt

export const ScheduleEntitie = sequelize.define("ScheduleEntitie", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    barberId: {type: DataTypes.INTEGER, allowNull: false},
    dayId: {type: DataTypes.INTEGER, allowNull: false},
    init_hour: {type: DataTypes.STRING(10), allowNull: false},
    end_hour: {type: DataTypes.STRING(10), allowNull: false},
},{
    paranoid: false,
    tableName: 'schedules',
    timestamps: true,
    freezeTableName: true
});