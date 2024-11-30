import React, { useEffect, useState } from "react";

import { IoMdAddCircleOutline } from "react-icons/io";
import { dataType, NavInterface } from "../types/enum";
import { nav } from "../utils/lib/data";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hook-redux";
import Todo from "../components/Home/Todo";
import {
  getOverdueTasks,
  getPendingTasks,
  getTodayTasks,
} from "../utils/helpers";
import { AiFillCaretUp } from "react-icons/ai";
import { deleteTodo, getTodo } from "../features/todo/todoSlice";

export default function Home() {
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.todo);
  const [dataStatus, setDataStatus] = useState<dataType[]>(data);
  const [active, setActive] = React.useState<NavInterface[]>(nav);
  useEffect(() => {
    setDataStatus(data);
  }, [data]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);
  const handleActive = (id: number) => {
    const updatedActive = active.map((item) => ({
      ...item,
      active: item.id === id,
    }));

    const findIndex = updatedActive.findIndex((item) => item.id === id);
    if (findIndex === -1) {
      console.log("Không tìm thấy phần tử với id:", id);
      return;
    }
    setActive(updatedActive);
    if (id === 1) {
      setDataStatus(getTodayTasks(data));
    } else if (id === 2) {
      setDataStatus(getPendingTasks(data));
      console.log(getPendingTasks(data));
    } else if (id === 3) {
      setDataStatus(getOverdueTasks(data));
      console.log(getOverdueTasks(data));
    } else {
      setDataStatus(data);
    }
  };
  const handleDirect = () => {
    navigate("/add-todo");
  };
  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    setDataStatus(data);
  };
  return (
    <div>
      <div className="space-y-4">
        <nav className="container mx-auto max-w-screen-md px-2">
          <ul className="flex list-none gap-x-3">
            {active?.map((item) => (
              <button
                className={clsx(
                  "w-full flex-1 flex-shrink-0 rounded-md py-4 font-medium text-white",
                  item.active ? "bg-green-500" : "bg-green-300",
                )}
                key={item.id}
                onClick={() => handleActive(item.id)}
              >
                {item.title}
              </button>
            ))}
          </ul>
        </nav>
        <section className="container mx-auto max-w-screen-lg space-y-4 px-2">
          <ul className="flex items-center justify-between">
            <li>
              <h2 className="text-2xl font-semibold">Task</h2>
            </li>
            <li className="rounded-md bg-green-700 px-6 py-2">
              <button
                className="flex items-center gap-2 text-lg font-semibold text-white"
                onClick={handleDirect}
              >
                <IoMdAddCircleOutline className="h-4 w-4" />
                Add task
              </button>
            </li>
          </ul>
          <Todo data={dataStatus} handleDelete={handleDelete} />
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold">Complete </h3>
            <span>
              <AiFillCaretUp className="h-6 w-6" />
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
