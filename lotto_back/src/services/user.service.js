import { dbConnector } from '../config/dbConnector.js';
import { User } from '../entities/User.entity.js';
import { NotFoundError, ConflictError } from '../utils/error.util.js';
import { randomUUID } from 'crypto';

export class UserService {
  constructor() {
    this.repository = null;
  }

  getRepository() {
    if (!this.repository) {
      const dataSource = dbConnector.getDataSource();
      this.repository = dataSource.getRepository(User);
    }
    return this.repository;
  }

  async createUser(uuid) {
    const repo = this.getRepository();

    const existingUser = await repo.findOne({ where: { UUID: uuid } });
    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    const user = repo.create({ UUID: uuid });
    return await repo.save(user);
  }

  async getUserByUUID(uuid) {
    const repo = this.getRepository();
    const user = await repo.findOne({ where: { UUID: uuid } });
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  //getAllUsers(), deleteUser(uuid) 는 안 쓰는것을 권장.
  async getAllUsers() {
    const repo = this.getRepository();
    return await repo.find();
  }

  async deleteUser(uuid) {
    const repo = this.getRepository();
    const user = await this.getUserByUUID(uuid);
    return await repo.remove(user);
  }
}