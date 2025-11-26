import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
  type: process.env.DB_TYPE || 'sqlite',
  database: process.env.DB_DATABASE || './database.sqlite',
  
  // PostgreSQL 설정 (추후 사용)
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  
  synchronize: true, // 개발 환경에서만 true
  logging: process.env.NODE_ENV === 'development',
  entities: [
    './src/entities/*.entity.js'
  ]
};