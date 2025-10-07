import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productsRoutes from './routes/productsRoutes';
import authRoutes from './routes/authRoutes';
import { connectToDatabase } from './config/db';

dotenv.config();

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// API routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT ? Number(process.env.PORT) : 5000;

if (process.env.NODE_ENV !== 'test') {
  // Connect to MongoDB (non-blocking)
  connectToDatabase().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection failed:', err?.message || err);
  });
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
  });
}

export default app;
