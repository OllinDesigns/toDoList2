"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
mongoose_1.default
    .connect("mongodb+srv://ollinDesigns:claveParaAtlas@cluster0.1b2ylxi.mongodb.net/todolist-db?retryWrites=true&w=majority")
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
const toDoSchema = new mongoose_1.default.Schema({
    item: String,
    completed: { type: Boolean, default: false },
});
const Todo = mongoose_1.default.model("Todo", toDoSchema, "todolist-db");
function toDoController(app) {
    app.get("/todo", (req, res) => {
        Todo.find({})
            .then((data) => {
            res.json(data);
        })
            .catch((err) => {
            console.error("Error retrieving data from MongoDB:", err);
            res.status(500).send("Internal Server Error");
        });
    });
    app.post("/todo", urlencodedParser, (req, res) => {
        const newTodo = new Todo({
            item: req.body.item,
            completed: false,
        });
        newTodo
            .save()
            .then(() => {
            console.log("New item added:", req.body.item);
            Todo.find({})
                .then((data) => {
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
    app.put("/todo/:id", (req, res) => {
        const taskId = req.params.id;
        const { completed } = req.body;
        console.log("Completed:", completed);
        Todo.findByIdAndUpdate(taskId, { completed: completed }, { new: true })
            .then((updatedTask) => {
            if (!updatedTask) {
                res.status(404).json({ error: "Task not found" });
            }
            else {
                res.json(updatedTask);
            }
        })
            .catch((err) => {
            console.error("Error updating task in MongoDB:", err);
            res.status(500).send("Internal Server Error");
        });
    });
    app.delete("/todo/:id", (req, res) => {
        const taskId = req.params.id;
        Todo.findByIdAndDelete(taskId)
            .then((deletedTask) => {
            if (!deletedTask) {
                res.status(404).json({ error: "Task not found" });
            }
            else {
                console.log("Deleted item:", deletedTask.item);
                res.json(deletedTask);
            }
        })
            .catch((err) => {
            console.error("Error deleting task in MongoDB:", err);
            res.status(500).send("Internal Server Error");
        });
    });
}
exports.default = toDoController;
