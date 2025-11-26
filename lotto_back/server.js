import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './src/app.js';
import { dbConnector } from './src/config/dbConnector.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 데이터베이스 초기화
    await dbConnector.initialize();
    
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing server...');
  await dbConnector.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing server...');
  await dbConnector.close();
  process.exit(0);
});

startServer();