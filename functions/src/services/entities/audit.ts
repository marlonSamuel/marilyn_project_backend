import { Model, ModelStatic } from 'sequelize'; 
import { Audit } from './models'; // Asegúrate de que Audit esté correctamente importado
import { getUserId } from '../../common/context';


// Función para añadir los hooks a un modelo
export const addAuditHooks = (model: ModelStatic<Model>) => {

  // Hook para 'CREATE'
  model.addHook('afterCreate', async (instance: Model) => {
    if(model.name === 'Audit') return;
    const userId = getUserId();
    console.log(model.name)
    await Audit.create({
      model: model.tableName,
      action: 'CREATE',
      dataAfter: instance.get(),
      userId: userId, // Asegúrate de que `userId` esté en las opciones
    }, { raw: true });
  });

  // Hook para 'UPDATE'
  model.addHook('beforeUpdate', async (instance: Model) => {
    if(model.name === 'Audit') return;
    const userId = getUserId();
    await Audit.create({
      model: model.tableName,
      action: 'UPDATE',
      dataBefore: instance.previous(), // Datos antes de la actualización
      dataAfter: instance.get(), // Datos después de la actualización
      userId: userId,
    }, { raw: true });
  });

  // Hook para 'DELETE'
  model.addHook('beforeDestroy', async (instance: Model) => {
    if(model.name === 'Audit') return;
    const userId = getUserId();
    await Audit.create({
      model: model.tableName,
      action: 'DELETE',
      dataBefore: instance.get(), // Datos antes de la eliminación
      userId: userId,
    }, { raw: true });
  });
};
