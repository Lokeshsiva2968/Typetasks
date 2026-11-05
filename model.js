let nextId = 1;
export function addTask(tasks, title) {
    while (tasks.some((task) => task.id === nextId)) {
        nextId++;
    }
    const newTask = { id: nextId++, title, status: "todo" };
    return [...tasks, newTask];
}
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id) {
            return task;
        }
        const status = task.status === "todo" ? "in-progress" : "done";
        return { ...task, status };
    });
}
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
