import 'reflect-metadata';
import dotenv from 'dotenv';
import { dbConnector } from '../src/config/dbConnector.js';
import { UserService } from '../src/services/user.service.js';
import { DailyLottoService } from '../src/services/dailyLotto.service.js';
import { UserLottoService } from '../src/services/userLotto.service.js';

dotenv.config();

async function testDatabase() {
  console.log('=== 데이터베이스 테스트 시작 ===\n');

  try {
    // DB 초기화
    await dbConnector.initialize();
    console.log('✅ 데이터베이스 연결 성공\n');

    const userService = new UserService();
    const dailyLottoService = new DailyLottoService();
    const userLottoService = new UserLottoService();

    // 1. User 테스트
    console.log('--- User 테스트 ---');
    const user1 = await userService.createUser();
    console.log('✅ User 생성:', user1);

    const user2 = await userService.createUser();
    console.log('✅ User 생성:', user2);

    const allUsers = await userService.getAllUsers();
    console.log(`✅ 전체 User 조회: ${allUsers.length}명\n`);

    // 2. DailyLotto 테스트
    console.log('--- DailyLotto 테스트 ---');
    const lotto1 = await dailyLottoService.createDailyLotto('08:00', [1, 5, 12, 23, 34, 40, 45]);
    console.log('✅ DailyLotto 생성:', lotto1);

    const lotto2 = await dailyLottoService.createDailyLotto('14:00', [2, 7, 15, 21, 33, 38, 44]);
    console.log('✅ DailyLotto 생성:', lotto2);

    const allLottos = await dailyLottoService.getAllDailyLottos();
    console.log(`✅ 전체 DailyLotto 조회: ${allLottos.length}개\n`);

    // 3. UserLotto 테스트
    console.log('--- UserLotto 테스트 ---');
    const userLotto1 = await userLottoService.createUserLotto(user1.UUID, [3, 9, 18, 27, 31, 39, 42]);
    console.log('✅ UserLotto 생성:', userLotto1);

    const userLotto2 = await userLottoService.createUserLotto(user1.UUID, [4, 11, 19, 25, 32, 37, 43]);
    console.log('✅ UserLotto 생성:', userLotto2);

    const userLotto3 = await userLottoService.createUserLotto(user2.UUID, [6, 13, 20, 28, 35, 41, 45]);
    console.log('✅ UserLotto 생성:', userLotto3);

    const user1Lottos = await userLottoService.getUserLottosByUUID(user1.UUID);
    console.log(`✅ User1의 로또: ${user1Lottos.length}개`);

    const allUserLottos = await userLottoService.getAllUserLottos();
    console.log(`✅ 전체 UserLotto 조회: ${allUserLottos.length}개\n`);

    // 4. 상세 데이터 확인
    console.log('--- 상세 데이터 확인 ---');
    console.log('\n전체 Users:');
    console.table(allUsers);

    console.log('\n전체 DailyLottos:');
    console.table(allLottos);

    console.log('\n전체 UserLottos:');
    console.table(allUserLottos);

    console.log('\n=== 테스트 완료 ===');
    console.log('✅ 모든 테스트가 성공적으로 완료되었습니다!');
    console.log('📁 database.sqlite 파일을 확인하여 데이터를 검증할 수 있습니다.');

  } catch (error) {
    console.error('❌ 테스트 실패:', error);
  } finally {
    await dbConnector.close();
  }
}

testDatabase();