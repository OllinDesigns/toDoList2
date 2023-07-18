import { Task } from '../../core/domain/entities/Task';

export class TaskRepository {
    private tasks: Task[] = [];
  
    addTask(task: Task): void {
      this.tasks.push(task);
    }
  
    updateTask(updatedTask: Task): void {
      const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
      }
    }
  
    removeTask(task: Task): void {
      const taskIndex = this.tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
      }
    }
  
    getTasks(): Task[] {
      return this.tasks;
    }
  }