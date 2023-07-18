"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskList = void 0;
const Task_1 = require("./Task");
class TaskList {
    constructor() {
        this.tasks = [];
    }
    addTask(description) {
        const newTask = new Task_1.Task('', description);
        this.tasks.push(newTask);
    }
    getTasks() {
        return this.tasks;
    }
}
exports.TaskList = TaskList;
