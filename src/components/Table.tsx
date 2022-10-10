import { Task } from "../pages/api/core/models/Task";
import { EditIcon, TrashIcon } from "./Icons";

type Props = {
  tasks: Task[];
  selectedTask?: (task: Task) => void;
  deleteTask?: (task: Task) => void;
  toogleDone: (task: Task) => void;
};

export function Table({ tasks, selectedTask, deleteTask, toogleDone }: Props) {
  const showActions = selectedTask || deleteTask;

  function renderHeader() {
    return (
      <tr>
        <th className="text-center py-4">Descrição</th>
        <th className="text-center py-4">Qtde</th>
        {showActions && <th className="text-center py-4 pl-2">Ações</th>}
      </tr>
    );
  }

  function renderData() {
    return tasks?.map((task, i) => (
      <tr
        key={`${task.getId()!} ${i}`}
        className={`${i % 2 === 0 ? "bg-zinc-600" : "bg-zinc-700"}`}
      >
        <td
          onClick={() => toogleDone(task)}
          className={
            task.getDone()
              ? "text-red-400 text-center py-4"
              : "text-center py-4"
          }
        >
          {task.getDescription()}
        </td>
        <td className=" text-center py-4">{task.getQuantity()}</td>
        {showActions && renderAction(task)}
      </tr>
    ));
  }

  function renderAction(task: Task) {
    return (
      <td className="flex justify-center items-center py-4 gap-5 pl-3">
        {selectedTask && (
          <button
            onClick={() => selectedTask(task)}
            className={`
            text-green-600 roundend-full
            hover:text-green-400
          `}
          >
            {EditIcon}
          </button>
        )}
        {deleteTask && (
          <button
            onClick={() => deleteTask(task)}
            className={`
          text-red-600 roundend-full
          hover:text-red-400
        `}
          >
            {TrashIcon}
          </button>
        )}
      </td>
    );
  }

  return (
    <table className="w-screen md:w-full">
      <thead
        className={`
        text-zinc-200
        bg-zinc-800
      `}
      >
        {renderHeader()}
      </thead>
      <tbody>{renderData()}</tbody>
    </table>
  );
}
