import { dbConnector } from '../config/dbConnector.js';
import { UserLotto } from '../entities/UserLotto.entity.js';
import { UserService } from './user.service.js';
import { ValidationError } from '../utils/error.util.js';

export class UserLottoService {
  constructor() {
    this.repository = null;
    this.userService = new UserService();
  }

  getRepository() {
    if (!this.repository) {
      const dataSource = dbConnector.getDataSource();
      this.repository = dataSource.getRepository(UserLotto);
    }
    return this.repository;
  }

  validateLottoNumbers(numbers) {
    if (numbers.length !== 7) {
      throw new ValidationError('Exactly 7 numbers are required');
    }
    
    for (const num of numbers) {
      if (typeof num !== 'number' || num < 1 || num > 45) {
        throw new ValidationError('Each number must be between 1 and 45');
      }
    }
  }

  async createUserLotto(uuid, numbers) {
    // 사용자 존재 확인
    await this.userService.getUserByUUID(uuid);
    
    this.validateLottoNumbers(numbers);
    
    const repo = this.getRepository();
    const userLotto = repo.create({
      UUID: uuid,
      No1: numbers[0],
      No2: numbers[1],
      No3: numbers[2],
      No4: numbers[3],
      No5: numbers[4],
      No6: numbers[5],
      No7: numbers[6]
    });
    
    return await repo.save(userLotto);
  }

  async getUserLottosByUUID(uuid) {
    await this.userService.getUserByUUID(uuid);
    
    const repo = this.getRepository();
    return await repo.find({ 
      where: { UUID: uuid },
      order: { No: 'DESC' }
    });
  }

  async getAllUserLottos() {
    const repo = this.getRepository();
    return await repo.find({ order: { No: 'DESC' } });
  }
}