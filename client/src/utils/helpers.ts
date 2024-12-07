import { dataType } from "../types/enum";

export const getDateOnly = (dateString: string): Date => {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getOverdueTasks = (tasks: dataType[]): dataType[] => {
    const todayDateOnly = getDateOnly(new Date().toString());

    return tasks.filter((task) => {
        const taskDateOnly = getDateOnly(task.date);
        return taskDateOnly < todayDateOnly;
    });
};

export const getTodayTasks = (tasks: dataType[]): dataType[] => {
    const todayDateOnly = getDateOnly(new Date().toString());

    return tasks.filter((task) => {
        const taskDateOnly = getDateOnly(task.date);
        return taskDateOnly.getTime() === todayDateOnly.getTime();
    });
};

export const getPendingTasks = (tasks: dataType[]): dataType[] => {
    const todayDateOnly = getDateOnly(new Date().toString());

    return tasks.filter((task) => {
        const taskDateOnly = getDateOnly(task.date);
        return taskDateOnly >= todayDateOnly;
    });
};