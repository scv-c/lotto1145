import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config.js';
import { User } from '../entities/User.entity.js';
import { DailyLotto } from '../entities/DailyLotto.entity.js';
import { UserLotto } from '../entities/UserLotto.entity.js';

class DBConnector {
  constructor() {
    this.dataSource = null;
  }

  async initialize() {
    try {
      const config = {
        ...databaseConfig,
        entities: [User, DailyLotto, UserLotto]
      };

      this.dataSource = new DataSource(config);
      await this.dataSource.initialize();
      console.log('✅ Database connection established');
      return this.dataSource;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  getDataSource() {
    if (!this.dataSource) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.dataSource;
  }

  async close() {
    if (this.dataSource) {
      await this.dataSource.destroy();
      console.log('Database connection closed');
    }
  }
}

export const dbConnector = new DBConnector();