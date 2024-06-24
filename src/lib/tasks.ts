import { tasks } from "./core/data";
import { Task } from "./core/models/Task";

export async function getTasks() {
  return tasks;
}

export async function createTask(description: string, quantity: number) {
  const id = tasks.length + 1;
  const newTask = new Task({
    id,
    description,
    quantity,
  })
  tasks.push(newTask);
}

type DataUpdate = {
  description: string;
  quantity: number;
};

export async function updateTask(taskId: number, data: DataUpdate) {
  const task = tasks.find((task) => task.getId() === taskId);
  if (task) {
    task.setDescription(data.description);
    task.setQuantity(data.quantity);
  }
  // change tasks array here
  const updateTask = new Task({
    id: taskId,
    description: data.description,
    quantity: data.quantity,
    done: task?.getDone() || false,
  })
}

export async function toggleDone(taskId: number) {
  const task = tasks.find((task) => task.getId() === taskId);
  if (task) {
    task.toggleDone();
  }
}

export async function deleteTask(taskId: number) {
  const task = tasks.find((task) => task.getId() === taskId);
  if (task) {
    tasks.splice(tasks.indexOf(task), 1);
  }
}

export async function deleteTasksDone() {
  const tasksDone = tasks.filter((task) => task.getDone());
  tasks.splice(0, tasksDone.length);
}
