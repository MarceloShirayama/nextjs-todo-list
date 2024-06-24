import type { NextApiRequest, NextApiResponse } from "next";
import { deleteTask, toggleDone, updateTask } from "../../../lib/tasks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      const { id } = req.query;
      if (id) {
        try {
          await toggleDone(Number(id));
          return res.status(200).json({ message: "OK" });
        } catch (e) {
          console.error("Request error", e);
          res.status(500).json({ error: "Error updating task" });
        }
      }
      break;

    case "DELETE": {
      const { id } = req.query;
      if (id) {
        try {
          await deleteTask(Number(id));
          return res.status(200).json({ message: "OK" });
        } catch (e) {
          console.error("Request error", e);
          res.status(500).json({ error: "Error deleting task" });
        }
      }
      break;
    }

    case "POST": {
      const { id } = req.query;
      const data = req.body;
      if (id) {
        try {
          const task = await updateTask(Number(id), data);
          res.status(201).json({ data: task });
        } catch (e) {
          console.error("Request error", e);
          res.status(500).json({ error: "Error creating task" });
        }
      }
      break;
    }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
