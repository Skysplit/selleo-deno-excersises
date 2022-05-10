import { Model, DataTypes } from "/deps.ts";

export class TodoItem extends Model {
  static table = "todo_items";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    checked: DataTypes.BOOLEAN,
    title: DataTypes.string(100),
    content: DataTypes.TEXT,
  };

  static timestamps = true;

  static defaults = {
    checked: false,
  };
}
