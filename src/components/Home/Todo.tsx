import clsx from "clsx";
import { dataType } from "../../types/enum";

import { IoTime } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAppDispatch } from "../../hooks/hook-redux";
import { updateStatusCase } from "../../features/todo/todoSlice";
import { useState } from "react";
import Modal from "./Modal";
interface TodoProps {
  data: dataType[];
  handleDelete: (id: number) => void;
}
export default function Todo({ data, handleDelete }: TodoProps) {
  const dispatch = useAppDispatch();
  const handleSuccess = (id: number) => {
    dispatch(updateStatusCase(id));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="content-scroll max-h-[310px] min-h-[310px] w-full overflow-y-auto">
      <div className="space-y-4">
        {data.map((item) => (
          <ul
            key={item.id}
            className="grid w-full grid-cols-3 items-center rounded-md bg-white px-10 py-4"
          >
            <li className="flex items-center justify-start gap-2">
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => handleSuccess(item.id)}
              />

              <h3 className="text-lg font-medium">{item.task}</h3>
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <IoTime className="h-6 w-6" /> <p>{item.date}</p>
            </li>
            <li className="flex items-center justify-end gap-2 text-gray-400">
              <MdEdit className="h-6 w-6" onClick={handleOpenModal} />
              <span
                className={clsx(
                  "h-6 w-4 rounded-md",
                  item.priority === "high" ? "bg-red-500" : "bg-yellow-300",
                )}
              ></span>
              <button onClick={() => handleDelete(item.id)}>
                <MdDelete className="h-6 w-6 text-red-400" />
              </button>
            </li>
          </ul>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Task Details"
      >
        <p>Here you can edit the task or see its details.</p>
        <form>
          <label htmlFor="taskName">Task Name</label>
          <input type="text" id="taskName" placeholder="Enter task name" />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
}
