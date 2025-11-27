import { EntitySchema } from 'typeorm';

export const UserLotto = new EntitySchema({
  name: 'UserLotto',
  tableName: 'user_lotto',
  columns: {
    No: {
      type: 'integer',
      primary: true,
      generated: true
    },
    Seq: {
      type: 'varchar',
      nullable: false
    },
    UUID: {
      type: 'varchar',
      nullable: false
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
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'UUID',
        referencedColumnName: 'UUID'
      }
    }
  }
});