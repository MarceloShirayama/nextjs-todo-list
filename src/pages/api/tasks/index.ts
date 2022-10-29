// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createTask, deleteTasksDone, getTasks } from "../../../lib/tasks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const tasks = await getTasks();
        return res.status(200).json({ data: tasks });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching tasks" });
      }
      break;
    }

    case "POST": {
      try {
        const { description, quantity } = req.body;
        const task = await createTask(description, quantity);
        res.status(201).json({ data: task });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error creating task" });
      }
      break;
    }

    case "DELETE": {
      try {
        await deleteTasksDone();
        return res.status(200).json({ message: "OK" });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error deleting tasks done." });
      }
      break;
    }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

// const tasksData = [
//   {
//     id: 1,
//     description: "Comprar pão na padaria",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     description: "Comprar biscoito no supermercado",
//     quantity: 2,
//   },
//   {
//     id: 3,
//     description: "Levar a Julia no volei",
//     done: true,
//   },
// ];
