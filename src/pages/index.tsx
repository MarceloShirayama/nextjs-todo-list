import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Table } from "../components/Table";
import { Task } from "../lib/core/models/Task";

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>(Task.emptyTask());
  const [visible, setVisible] = useState<"table" | "form">("table");

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const { data } = await (await fetch("/api/tasks")).json();
      const getTasks = data.map(
        (task: any) =>
          new Task({
            id: task.id,
            description: task.description,
            quantity: task.quantity,
            done: task.done,
          })
      );
      setTasks(getTasks);
    } catch (error) {
      console.log(error);
    }
  }

  function selectedTask(task: Task) {
    setTask(task);
    setVisible("form");
  }

  async function deleteTask(task: Task) {
    const id = task.getId();
    await fetch("api/tasks/" + id, {
      method: "DELETE",
    });
    getTasks();
  }

  async function deleteTasksDone() {
    await fetch("api/tasks", {
      method: "DELETE",
    });
    getTasks();
  }

  async function saveTask(task: Task) {
    const newTasks = [...tasks];
    let data;
    let url;
    if (task.getId()) {
      url = `/api/tasks/${task.getId()}`;
      data = {
        id: task.getId(),
        description: task.getDescription(),
        quantity: task.getQuantity(),
        done: task.getDone(),
      };
    } else {
      url = "/api/tasks";
      data = {
        description: task.getDescription(),
        quantity: task.getQuantity(),
      };
    }
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    newTasks.push(task);
    setTasks(newTasks);
    setVisible("table");
    getTasks();
  }

  function newTask() {
    setTask(Task.emptyTask());
    setVisible("form");
  }

  async function toogleDone(task: Task) {
    const id = task.getId();
    await fetch("api/tasks/toogle-done/" + id, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log);
    const taskToChange = tasks.find((task) => task.getId() === id);
    const newTasks = [...tasks];
    if (taskToChange) {
      taskToChange.toggleDone();
      setTasks(newTasks);
    }
  }

  return (
    <div
      className={`
      flex sm:items-start md:items-center md:justify-center h-screen
      bg-gradient-to-r from-zinc-700 via-zinc-900 to-black
      text-zinc-100
    `}
    >
      <Layout title="Lista de Tarefas">
        {visible === "table" && (
          <>
            <div className="flex justify-between">
              <Button className="mb-4" color="red" onClick={deleteTasksDone}>
                Excluir realizadas
              </Button>
              <Button className="mb-4" color="green" onClick={newTask}>
                Nova tarefa
              </Button>
            </div>
            <Table
              tasks={tasks}
              selectedTask={selectedTask}
              deleteTask={deleteTask}
              toogleDone={toogleDone}
            />
          </>
        )}
        {visible === "form" && (
          <Form
            task={task}
            backToTable={() => setVisible("table")}
            changedTask={(task) => saveTask(task)}
          />
        )}
      </Layout>
    </div>
  );
};

export default Home;
