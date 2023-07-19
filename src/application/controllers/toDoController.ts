import { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { ITodoItem } from "../dtos/IToDoItem";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to the database
mongoose
  .connect(
    "mongodb+srv://ollinDesigns:claveParaAtlas@cluster0.1b2ylxi.mongodb.net/todolist-db?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a schema, like a blueprint
const toDoSchema = new mongoose.Schema({
  item: String,
  completed: { type: Boolean, default: false }, // Add the completed property with a default value of false
});

// Create a model with the desired database name ('Todo' collection will be created within this database)
const Todo = mongoose.model<ITodoItem>("Todo", toDoSchema, "todolist-db");

export default function toDoController(app: any) {
  app.get("/todo", (req: Request, res: Response) => {
    // Get data from MongoDB and return it as JSON
    Todo.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.error("Error retrieving data from MongoDB:", err);
        res.status(500).send("Internal Server Error");
      });
  });

  app.post("/todo", urlencodedParser, (req: Request, res: Response) => {
    // Get data from the view and add it to MongoDB
    const newTodo = new Todo({
      item: req.body.item,
      completed: false, // Set completed to false initially when creating a new task
    });

    newTodo
      .save()
      .then(() => {
        // Log the added item to the console
        console.log("New item added:", req.body.item);

        // Get the updated list from MongoDB
        Todo.find({})
          .then((data) => {
            // Send the updated list as a JSON response
            res.json(data);
          })
          .catch((err) => {
            console.error("Error retrieving updated data from MongoDB:", err);
            res.status(500).send("Internal Server Error");
          });
      })
      .catch((err) => {
        console.error("Error saving data to MongoDB:", err);
        res.status(500).send("Internal Server Error");
      });
  });

  // Route to mark a task as completed
  app.put("/todo/:id", (req: Request, res: Response) => {
    const taskId = req.params.id;
    const { completed } = req.body as ITodoItem; // Ensure the request body follows the ITodoItem interface

    console.log("Completed:", completed);

    // Find the task by its ID and update the completed field
    Todo.findByIdAndUpdate(taskId, { completed: completed }, { new: true })
      .then((updatedTask) => {
        if (!updatedTask) {
          res.status(404).json({ error: "Task not found" });
        } else {
          res.json(updatedTask);
        }
      })
      .catch((err) => {
        console.error("Error updating task in MongoDB:", err);
        res.status(500).send("Internal Server Error");
      });
  });

  // Route to delete a task
  app.delete("/todo/:id", (req: Request, res: Response) => {
    const taskId = req.params.id;

    // Find the task by its ID and delete it
    Todo.findByIdAndDelete(taskId)
      .then((deletedTask) => {
        if (!deletedTask) {
          res.status(404).json({ error: "Task not found" });
        } else {
          console.log("Deleted item:", deletedTask.item); // Log the deleted item
          res.json(deletedTask);
        }
      })
      .catch((err) => {
        console.error("Error deleting task in MongoDB:", err);
        res.status(500).send("Internal Server Error");
      });
  });
}
