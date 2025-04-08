// MODEL

interface Task {
  id: number;
  taskContent: string;
}

class Model {
  private tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTask(taskId: Task["id"]) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  getTasks() {
    return this.tasks;
  }
}

// VIEW
class View {
  render(tasks: Task[], removeTaskCallbackFN: (index: Task["id"]) => void) {
    const taskElement = document.getElementById("task-list");

    if (!taskElement) return;

    taskElement.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.taskContent;
      li.addEventListener("click", () => {
        removeTaskCallbackFN(task.id);
      });
      taskElement?.appendChild(li);
    });
  }
}

// CONTROLLER

class Controller {
  private taskView: View;
  private taskModel: Model;

  constructor() {
    this.taskView = new View();
    this.taskModel = new Model();
  }

  addTask(task: Task) {
    this.taskModel.addTask(task);
    this.taskView.render(this.taskModel.getTasks(), this.removeTask.bind(this));
  }

  removeTask(id: Task["id"]) {
    this.taskModel.removeTask(id);
    this.taskView.render(this.taskModel.getTasks(), this.removeTask.bind(this));
  }
}
