import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch } from "../hooks/hook-redux";
import { addTodo } from "../features/todo/todoSlice";
import { dataTypeAdd } from "../types/enum";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  task: z.string().min(1, { message: "Please enter title!" }),
  date: z.string({
    invalid_type_error: "Please select date!",
    message: "Please select date!",
    required_error: "Please select date!",
  }),
});
type Schema = z.infer<typeof schema>;
export default function AddTodo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const [priority, setPriority] = React.useState<string>("medium");
  const onSubmit = (value: Schema) => {
    const selectedDate = new Date(value.date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = selectedDate.toLocaleDateString("en-US", options);

    const data: dataTypeAdd = {
      task: value.task,
      date: formattedDate,
      priority: priority,
      status: false,
    };
    try {
      dispatch(addTodo(data));
      Swal.fire({
        icon: "success",
        title: "Add Task successfully",
        text: "Add Task successfully!",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fail add Task",
        text: "Fail add Task!",
      });
    }
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <section className="container mx-auto max-w-screen-lg space-y-4 px-2 pt-20">
      <form
        className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1">
          <label htmlFor="task" className="cursor-pointer">
            Task
          </label>
          <input
            type="text"
            id="task"
            {...register("task")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your title"
          />
          {errors.task && (
            <p className="text-sm text-red-600">
              {errors.task.message as string}
            </p>
          )}
        </div>
        <div className="col-span-1">
          <label htmlFor="date" className="cursor-pointer">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              className="mt-1 block w-40 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option
                value="high"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                High
              </option>
              <option
                value="medium"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                Medium
              </option>
            </select>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-4">
          {" "}
          <button
            onClick={handleBack}
            className="mt-4 w-60 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Close
          </button>
          <button
            type="submit"
            className="mt-4 w-60 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add task
          </button>
        </div>
      </form>
    </section>
  );
}
