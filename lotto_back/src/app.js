import express from 'express';
import userRoutes from './routes/user.routes.js';
import dailyLottoRoutes from './routes/dailyLotto.routes.js';
import userLottoRoutes from './routes/userLotto.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ResponseUtil } from './utils/response.util.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// 라우트
app.get('/', (req, res) => {
  res.json(ResponseUtil.success({
    message: 'Welcome to Lotto API',
    version: '1.0.0'
  }));
});


app.use('/api/users', userRoutes);
app.use('/api/user-lotto', userLottoRoutes);
app.use('/api/daily-lotto', dailyLottoRoutes);

// 404 핸들러
app.use((req, res) => {
  res.status(404).json(
    ResponseUtil.error('Route not found', 404)
  );
});

// 에러 핸들러
app.use(errorHandler);

export default app;