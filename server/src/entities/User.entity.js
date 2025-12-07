import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    No: {
      type: "integer",
      primary: true,
      generated: true,
    },
    UUID: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    Nickname: {
      type: "varchar",
      unique: true,
      nullable: true,
    },
    MaxScore: {
      type: "integer",
      nullable: true,
    },
  },
});
