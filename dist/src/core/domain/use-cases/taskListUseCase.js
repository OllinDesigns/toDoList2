"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskListUseCase = void 0;
const Task_1 = require("../entities/Task");
class TaskListUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    addTask(description) {
        const newTask = new Task_1.Task('', description);
        this.taskRepository.addTask(newTask);
    }
    markTaskAsCompleted(task) {
        task.completed = true;
        this.taskRepository.updateTask(task);
    }
    removeTask(task) {
        this.taskRepository.removeTask(task);
    }
    getTasks() {
        return this.taskRepository.getTasks();
    }
}
exports.TaskListUseCase = TaskListUseCase;
