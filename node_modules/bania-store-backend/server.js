import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import connectDB from './src/config/db.js';
import allRoutes from './src/routes/index.js';
import { errorHandler } from './src/middlewares/error.middleware.js';

// Load environment variables from .env file
dotenv.config();
// Load environment variables from .env file

// Initialize Express app
const app = express();

// --- Security Middlewares ---

// 1. Set security HTTP headers
app.use(helmet());

// 2. Configure CORS
const corsOptions = {
    origin: (origin, callback) => {
        // In production, you should replace this with a whitelist of your frontend domains
        const whitelist = (process.env.CORS_ORIGIN || "").split(',');
        if (process.env.NODE_ENV === 'development' || !origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use(cors(corsOptions));


// --- Global Middlewares ---
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));


// --- API Rate Limiting ---
// Apply to all requests starting with /api
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);



// --- Database Connection ---
connectDB(process.env.MONGO_URI); // <-- پاس دادن مستقیم URI


// --- API Routes ---
app.use('/api', allRoutes);


// --- Health check route ---
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bania Store API is up and running!'
    });
});


// --- Error Handling Middleware ---
// This must be the last middleware
app.use(errorHandler);


// --- Start the server ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
