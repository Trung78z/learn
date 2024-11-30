import clsx from "clsx";
import { dataType } from "../../types/enum";

import { IoTime } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAppDispatch } from "../../hooks/hook-redux";
import { editTodo, updateStatusCase } from "../../features/todo/todoSlice";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { z } from "zod";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface TodoProps {
  data: dataType[];
  handleDelete: (id: number) => void;
}

const schema = z.object({
  task: z.string().min(1, { message: "Please enter title!" }),
  date: z.string({
    invalid_type_error: "Please select date!",
    message: "Please select date!",
    required_error: "Please select date!",
  }),
});
type Schema = z.infer<typeof schema>;

export default function Todo({ data, handleDelete }: TodoProps) {
  const dispatch = useAppDispatch();

  const handleSuccess = (id: number) => {
    dispatch(updateStatusCase(id));
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
              <EditTodo dataOld={item} />
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
    </div>
  );
}

function EditTodo({ dataOld }: { dataOld: dataType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    setValue("task", dataOld.task);
    setValue("date", new Date(dataOld?.date).toISOString().slice(0, 10));
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [priority, setPriority] = React.useState<string>(dataOld.priority);
  const onSubmit = (value: Schema) => {
    const selectedDate = new Date(value.date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = selectedDate.toLocaleDateString("en-US", options);

    const data: dataType = {
      id: dataOld.id,
      task: value.task,
      date: formattedDate,
      priority: priority,
      status: dataOld.status,
    };
    try {
      dispatch(editTodo(data));
      handleCloseModal();
      Swal.fire({
        icon: "success",
        title: "Edit Task successfully",
        text: "Edit Task successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fail update Task",
        text: "Fail update Task!",
      });
    }
  };

  return (
    <>
      <MdEdit
        className="h-6 w-6 cursor-pointer hover:text-green-600"
        onClick={handleOpenModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Task Details"
      >
        <div className="space-y-6">
          <p className="text-black">
            Here you can edit the task or see its details.
          </p>
          <form
            className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-span-2">
              <label htmlFor="task" className="cursor-pointer">
                Task
              </label>
              <input
                type="text"
                id="task"
                {...register("task")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your title"
              />
              {errors.task && (
                <p className="text-sm text-red-600">
                  {errors.task.message as string}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label htmlFor="date" className="cursor-pointer">
                Date
              </label>
              <input
                type="date"
                id="date"
                {...register("date")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your title"
              />
              {errors.date && (
                <p className="text-sm text-red-600">
                  {errors.date.message as string}
                </p>
              )}
            </div>
            <div className="col-span-2 flex flex-col items-center">
              <div>
                <label htmlFor="priority">Priority</label>
                <select
                  name="priority"
                  id="priority"
                  defaultValue={"medium"}
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  className="mt-1 block w-40 rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option
                    value="high"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    High
                  </option>
                  <option
                    value="medium"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    Medium
                  </option>
                </select>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-x-4">
              <button
                onClick={handleCloseModal}
                className="cursor-pointer rounded-md border-none bg-[#007bff] px-2 py-2 text-white hover:bg-[#0056b3]"
              >
                Close
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-md border-none bg-green-500 px-2 py-2 text-white hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
