import express from 'express'
import authroutes from './routes/auth.routes.js';
import adminLogRoutes from './routes/adminlog.routes.js';
import cors from 'cors';
import swapRequestRoutes from './routes/swapRequest.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';



const app = express()
app.use(cors());

//router imports 
import healthCheckRoutes from './routes/healthcheck.routes.js';

app.use('/api/v1/healthCheckRoutes', healthCheckRoutes);
app.use('/api/v1/auth', authroutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use('/api', adminLogRoutes);
app.use('/api', swapRequestRoutes);
app.use('/api', feedbackRoutes);

export default app;