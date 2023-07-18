import { TaskList } from '../../../../src/core/domain/entities/TaskList';


describe('TaskList', () => {
  let taskList: TaskList;

  beforeEach(() => {
    taskList = new TaskList();
  });

  it('should add a task to the list', () => {
    const description = 'Test Task';
    taskList.addTask(description);

    const tasks = taskList.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe(description);
  });
});
