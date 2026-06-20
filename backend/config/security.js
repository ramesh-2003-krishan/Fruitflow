import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const FRONTEND_URL = (process.env.FRONTEND_URL || 'https://fruitflow-peach.vercel.app').replace(/\/$/, '');

export const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};

export function applySecurity(app){
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(limiter);
}