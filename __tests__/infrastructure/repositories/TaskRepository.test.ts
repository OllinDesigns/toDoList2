import { Task } from '../../../src/core/domain/entities/Task';
import { TaskRepository } from '../../../src/infrastructure/repositories/TaskRepository';

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;

  beforeEach(() => {
    taskRepository = new TaskRepository();
  });

  test('should add a task', () => {
    const task = new Task('1', 'Task description');
    taskRepository.addTask(task);

    const tasks = taskRepository.getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toBe(task);
  });

  test('should update a task', () => {
    const task = new Task('1', 'Task description');
    taskRepository.addTask(task);

    const updatedTask = new Task('1', 'Updated task description');
    taskRepository.updateTask(updatedTask);

    const tasks = taskRepository.getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toBe(updatedTask);
  });

  test('should remove a task', () => {
    const task = new Task('1', 'Task description');
    taskRepository.addTask(task);

    taskRepository.removeTask(task);

    const tasks = taskRepository.getTasks();
    expect(tasks).toHaveLength(0);
  });
});


// Create a new file named TaskRepository.test.ts in the __tests__/infrastructure/repositories folder and add the test code provided earlier. This will ensure that the test is organized under the appropriate directory structure and reflects the location of the TaskRepository implementation.

// Remember to update the import paths in the test file to match the location of the TaskRepository implementation relative to the test file.

// Let me know if you need further assistance!