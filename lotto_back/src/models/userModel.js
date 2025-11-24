/**
 * User Model (메모리 기반 - 추후 DB 연결 시 교체)
 */

// 임시 데이터 저장소
let users = [
    { id: 1, name: '김철수', email: 'kim@example.com', age: 30 },
    { id: 2, name: '이영희', email: 'lee@example.com', age: 25 },
    { id: 3, name: '박민수', email: 'park@example.com', age: 28 }
  ];
  
  let nextId = 4;
  
  /**
   * 전체 유저 조회
   */
  export const findAll = () => {
    return users;
  };
  
  /**
   * ID로 유저 조회
   */
  export const findById = (id) => {
    return users.find(user => user.id === parseInt(id));
  };
  
  /**
   * 유저 생성
   */
  export const create = (userData) => {
    const newUser = {
      id: nextId++,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  };
  
  /**
   * 유저 업데이트
   */
  export const update = (id, userData) => {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return null;
  
    users[index] = {
      ...users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    return users[index];
  };
  
  /**
   * 유저 삭제
   */
  export const remove = (id) => {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return false;
  
    users.splice(index, 1);
    return true;
  };