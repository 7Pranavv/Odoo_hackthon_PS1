import express from 'express'


const app = express()

//router imports 
import healthCheckRoutes from './routes/healthcheck.routes.js';

app.use('/api/v1/healthCheckRoutes', healthCheckRoutes);

export default app;