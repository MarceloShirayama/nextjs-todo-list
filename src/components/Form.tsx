import { useState } from "react";
import { Task } from "../pages/api/core/models/Task";
import { Button } from "./Button";
import { Input } from "./Input";

type Props = {
  task: Task;
  backToTable?: () => void;
  changedTask?: (task: Task) => void;
};

export function Form({ task, backToTable, changedTask }: Props) {
  const id = task?.getId() ?? null;
  const done = task?.getDone();
  const [description, setDescription] = useState(task?.getDescription() ?? "");
  const [quantity, setQuantity] = useState(task?.getQuantity() ?? undefined);

  return (
    <div>
      {id && <Input text="Código" value={id} readOnly />}
      <Input
        text="Descrição"
        type="text"
        placeholder="Insira uma descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        text="Quantidade"
        type="number"
        placeholder="Insira a quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <div className="flex justify-end gap-4 mt-5">
        <Button
          color="blue"
          onClick={() =>
            changedTask?.(
              new Task({
                id: Number(id),
                description,
                quantity,
                done,
              })
            )
          }
        >
          {id ? "Alterar" : "Salvar"}
        </Button>
        <Button onClick={backToTable}>Cancelar</Button>
      </div>
    </div>
  );
}
