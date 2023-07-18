import { TaskList } from '../core/domain/entities/TaskList';
import { TaskRepository } from '../infrastructure/repositories/TaskRepository';


const taskRepository = new TaskRepository();
const taskList = new TaskList();

taskList.addTask('Buy groceries');
const tasks = taskList.getTasks();
console.log(tasks);

taskList.addTask('play gitar');

taskList.addTask('cook dinner');

console.log(taskList)