import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

/*
	id int primary key auto_increment,
    test_case_id int not null,
	assigned_to int not null,
    description varchar(500) null,
    status char(1) not null default 'n', #n=nuevo, i = en proceso, c = cerrado, r=reabierto
    severity char(1) not null default 'l', #c=critico, h=alto, m=medio, l=bajo,
    resolve_date date null,
    time_in_minutes int null,
	createdAt timestamp null,
    updatedAt timestamp null,
    foreign key (test_case_id) references test_cases(id),
    foreign key (assigned_to) references users(id)
*/
export const Defect = sequelize.define("Defect", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    test_case_id: {type: DataTypes.INTEGER, allowNull: false},
    assigned_to: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING(200), allowNull: false},
    status: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'p'},
    severity: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'l'},
    resolve_date: {type: DataTypes.DATE, allowNull: true},
    hours: {type: DataTypes.INTEGER, allowNull: true},
},{
    paranoid: false,
    tableName: 'defects',
    timestamps: true,
    freezeTableName: true
})