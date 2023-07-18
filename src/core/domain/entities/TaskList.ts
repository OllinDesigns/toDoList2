import { Task } from './Task';

export class TaskList {
  private tasks: Task[] = [];

  addTask(description: string): void {
    const newTask = new Task('', description);
    this.tasks.push(newTask);
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}