import mongoose from "mongoose";

const todosSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter task name"],
  },
  date: {
    type: Date,
    required: false,
  },
  prioriry: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: false,
  },
});

export const Todo = mongoose.model("Todo", todosSchema);
