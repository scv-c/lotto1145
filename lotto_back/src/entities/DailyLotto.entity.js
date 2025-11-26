import { EntitySchema } from 'typeorm';

export const DailyLotto = new EntitySchema({
  name: 'DailyLotto',
  tableName: 'daily_lotto',
  columns: {
    No: {
      type: 'integer',
      primary: true,
      generated: true
    },
    seq: {
      type: 'varchar',
      nullable: false,
      comment: 'HH:mm 형식의 회차 값'
    },
    No1: {
      type: 'integer',
      nullable: false
    },
    No2: {
      type: 'integer',
      nullable: false
    },
    No3: {
      type: 'integer',
      nullable: false
    },
    No4: {
      type: 'integer',
      nullable: false
    },
    No5: {
      type: 'integer',
      nullable: false
    },
    No6: {
      type: 'integer',
      nullable: false
    },
    No7: {
      type: 'integer',
      nullable: false
    }
  }
});