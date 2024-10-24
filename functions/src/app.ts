
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';


// Load environment variables from .env file
import dotenv from 'dotenv';
console.log("dov eenv config")
dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});


import express from 'express';
import cors from 'cors';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';


import { sequelize } from './common/mysql.persistence';
import { addAuditHooks } from './services/entities/audit';
console.log(process.env.APP_FOO);

const app = express();

process.env.TZ = 'America/Guatemala';

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));
// Parse incoming JSON requests
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Load the dependency injection container
loadContainer(app);

// Load controllers from the 'controllers' directory
app.use(loadControllers(
    'controllers/*.ts',
    {cwd: __dirname}
));


//database conection
try {
    sequelize.authenticate().then(()=>{
        console.log("Database online")
    })
} catch (error) {
    console.log("Error de conexión ", error)
}

// Start the server only in development environment
if (process.env.APP_FOO === 'development') {
    app.listen(3000, ()=> {
        console.log('Server running on port 3000');
    });
}

// Aplica los hooks de auditoría a todos los modelos registrados en Sequelize
Object.values(sequelize.models).forEach((model) => {
    console.log(model);
    addAuditHooks(model);
});
  
// Luego, realiza la sincronización de los modelos
sequelize.sync();

export default app;