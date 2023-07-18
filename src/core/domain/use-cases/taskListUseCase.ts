import { Task } from '../entities/Task';
import { TaskRepository } from '../../../infrastructure/repositories/TaskRepository';



export class TaskListUseCase {
    constructor(private taskRepository: TaskRepository) {}
  
    addTask(description: string): void {
        const newTask = new Task('', description);
        this.taskRepository.addTask(newTask);
  }

  markTaskAsCompleted(task: Task): void {
    task.completed = true;
    this.taskRepository.updateTask(task);
  }

  removeTask(task: Task): void {
    this.taskRepository.removeTask(task);
  }

  getTasks(): Task[] {
    return this.taskRepository.getTasks();
  }
}


