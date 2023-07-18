import { Task } from '../../../../src/core/domain/entities/Task';

describe('Task', () => {
  it('should create a task with the provided id, description, and completed status', () => {
    const taskId = '1';
    const taskDescription = 'Buy groceries';
    const taskCompleted = false;

    const task = new Task(taskId, taskDescription, taskCompleted);

    expect(task.id).toBe(taskId);
    expect(task.description).toBe(taskDescription);
    expect(task.completed).toBe(taskCompleted);
  });

  it('should create a task with the completed status set to false if not provided', () => {
    const taskId = '1';
    const taskDescription = 'Buy groceries';

    const task = new Task(taskId, taskDescription);

    expect(task.completed).toBe(false);
  });
});
