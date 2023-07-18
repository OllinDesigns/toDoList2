import { Task } from '../../../src/core/domain/entities/Task';
import { TaskRepository } from '../../../src/infrastructure/repositories/TaskRepository';
import { TaskListUseCase } from '../../../src/core/domain/use-cases/taskListUseCase';

  describe('TaskListUseCase', () => {
  let taskRepository: TaskRepository;
  let taskListUseCase: TaskListUseCase;

  beforeEach(() => {
    taskRepository = new TaskRepository();
    taskListUseCase = new TaskListUseCase(taskRepository);
  });

  it('should add a task to the repository', () => {
    const description = 'Test Task';
    taskListUseCase.addTask(description);

    const tasks = taskListUseCase.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe(description);
  });

  it('should mark a task as completed', () => {
    const task = new Task('1', 'Test Task');
    taskListUseCase.addTask(task.description);
  
    taskListUseCase.markTaskAsCompleted(task);
  
    const updatedTask = taskListUseCase.getTasks()[0];
  
    console.log('Original Task:', task);
    console.log('Updated Task:', updatedTask);
  
    expect(updatedTask.completed).toBe(true);
  });
  

  it('should remove a task from the repository', () => {
    const task = new Task('1', 'Test Task');
    taskListUseCase.addTask(task.description);

    taskListUseCase.removeTask(task);

    const tasks = taskListUseCase.getTasks();
    expect(tasks.length).toBe(0);
  });
});

