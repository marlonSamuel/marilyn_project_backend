import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';

// Modelo Audit
export const Audit = sequelize.define('Audit', {
    model: {
      type: DataTypes.STRING, // El nombre del modelo que se está auditando
    },
    action: {
      type: DataTypes.STRING, // 'CREATE', 'UPDATE' o 'DELETE'
    },
    dataBefore: {
      type: DataTypes.JSON, // Datos antes de la actualización (solo para 'UPDATE')
      allowNull: true,
    },
    dataAfter: {
      type: DataTypes.JSON, // Datos después de la acción
    },
    userId: {
      type: DataTypes.INTEGER, // El usuario que realizó la acción
      allowNull: true, // Si quieres almacenar el ID de usuario
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Hora de la auditoría
    }
});