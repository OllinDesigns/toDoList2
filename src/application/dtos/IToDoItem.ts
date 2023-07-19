// Import mongoose for TypeScript type references
import mongoose from "mongoose";

// Define the interface for a todo item
export interface ITodoItem {
  _id: mongoose.Types.ObjectId; // MongoDB document ID
  item: string; // The todo item text
  completed: boolean; // Whether the todo item is completed or not
}
