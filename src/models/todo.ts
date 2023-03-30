import mongoose from "mongoose";

interface ITodo {
  title: string;
  description: string;
}

// ? -> typescript does not understand what it means to
// assign a property to statics object of the todoSchema
interface TodoModelInterface extends mongoose.Model<ITodo> {
  build(todo: ITodo): ITodo;
}

interface TodoDoc extends mongoose.Document {
  titlee: string;
  description: string;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// enforces strict type checking
todoSchema.statics.build = (todo: ITodo) => {
  return new Todo(todo);
};

const Todo = mongoose.model<TodoDoc, TodoModelInterface>("Todo", todoSchema);
export { Todo };

// Todo.build({ title: "test", description: "test" });
