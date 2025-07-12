import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/db.js';



dotenv.config({
    path: './.env'
})
const PORT = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
    console.log(`Server is running on port : http://localhost:${PORT}`);
});
    })
    .catch((err) => {
        console.error('Database connection error:', err);
        process.exit(1);
    });


    

// Inside app setup





