import prisma from "./prisma";

export async function getTasks() {
  const tasks = await prisma.task.findMany();

  return tasks;
}

export async function createTask(description: string, quantity: number) {
  const task = await prisma.task.create({
    data: {
      description,
      quantity,
      done: false,
    },
  });

  return task;
}

type DataUpdate = {
  description: string;
  quantity: number;
};

export async function updateTask(taskId: number, data: DataUpdate) {
  const updateTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: data,
  });

  return updateTask;
}

export async function toogleDone(taskId: number) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
  const updateTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      done: !task?.done,
    },
  });

  return updateTask;
}

export async function deleteTask(taskId: number) {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return deletedTask;
}

export async function deleteTasksDone() {
  const deletedTasks = await prisma.task.deleteMany({
    where: {
      done: true,
    },
  });
  return deletedTasks;
}
