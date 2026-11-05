import {
  advanceTask,
  addTask,
  deleteTask,
  filterByStatus,
  type Task,
  type TaskStatus,
} from "./model.js";

type TaskFilter = "all" | TaskStatus;

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const emptyState = document.getElementById("empty-state") as HTMLParagraphElement;
const taskCount = document.getElementById("task-count") as HTMLSpanElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-button");

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

let tasks: Task[] = [];
let currentFilter: TaskFilter = "all";

function getVisibleTasks(): Task[] {
  return currentFilter === "all"
    ? tasks
    : filterByStatus(tasks, currentFilter);
}

function renderTasks(): void {
  const visibleTasks = getVisibleTasks();
  taskList.replaceChildren();
  taskCount.textContent = String(tasks.length);
  emptyState.hidden = visibleTasks.length > 0;
  emptyState.textContent =
    tasks.length === 0
      ? "Your list is a blank page. Add one small thing to get started."
      : "Nothing in this filter just yet. Try another view or add a new task.";

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.className = `task-item${task.status === "done" ? " is-done" : ""}`;
    item.dataset.status = task.status;

    const dot = document.createElement("span");
    dot.className = `status-dot${task.status === "done" ? " done" : ""}`;
    dot.setAttribute("aria-hidden", "true");

    const copy = document.createElement("div");
    copy.className = "task-copy";

    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = statusLabels[task.status];
    copy.append(title, status);

    const completeButton = document.createElement("button");
    completeButton.className = "task-action";
    completeButton.type = "button";
    completeButton.textContent =
      task.status === "todo"
        ? "Start"
        : task.status === "in-progress"
          ? "Complete"
          : "Completed";
    completeButton.disabled = task.status === "done";
    completeButton.setAttribute(
      "aria-label",
      `${completeButton.textContent}: ${task.title}`,
    );
    completeButton.addEventListener("click", () => {
      tasks = advanceTask(tasks, task.id);
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-action";
    deleteButton.type = "button";
    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("aria-label", `Remove: ${task.title}`);
    deleteButton.addEventListener("click", () => {
      tasks = deleteTask(tasks, task.id);
      renderTasks();
    });

    item.append(dot, copy, completeButton, deleteButton);
    taskList.append(item);
  }
}

taskForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (title.length === 0) {
    titleInput.focus();
    return;
  }

  tasks = addTask(tasks, title);
  titleInput.value = "";
  titleInput.focus();
  renderTasks();
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const status = button.dataset.status as TaskFilter;
    currentFilter = status;

    for (const filterButton of filterButtons) {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    }

    renderTasks();
  });
}

renderTasks();
