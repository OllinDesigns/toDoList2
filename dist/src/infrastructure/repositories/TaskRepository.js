"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
class TaskRepository {
    constructor() {
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
    }
    updateTask(updatedTask) {
        const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = updatedTask;
        }
    }
    removeTask(task) {
        const taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
        }
    }
    getTasks() {
        return this.tasks;
    }
}
exports.TaskRepository = TaskRepository;
