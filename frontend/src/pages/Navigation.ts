// w tym pliku ogólna logika renderowania aplikacji

import { renderHome } from "./home";
// import { renderTasks } from "./pages/tasks";
import { createIzrzDocument } from "./createIzrzDocument";

type Page = "home" | "tasks" | "document";

class NavigationView {
  renderOnload(navigate: (page: Page) => void) {
    document.addEventListener("DOMContentLoaded", () => {
      this.renderNavigation(navigate);
      navigate("home");
    });
  }

  renderNavigation(navigate: (page: Page) => void) {
    const navigation = document.getElementById("navigation")!;
    navigation.innerHTML = `
        <ul>
            <li><a href="#" id="nav-home">Home</a></li>
            <li><a href="#" id="nav-tasks">Tasks</a></li>
            <li><a href="#" id="nav-document">Document</a></li>
        </ul>
    `;

    // Dodanie obsługi nawigacji, prevent default natywnych linków
    navigation.querySelector("#nav-home")!.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("home");
    });

    navigation.querySelector("#nav-tasks")!.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("tasks");
    });

    navigation.querySelector("#nav-document")!.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("document");
    });
  }
}

class NavigationModel {
  constructor() {
    this.navigate = this.navigate.bind(this);
  }

  navigate(page: Page) {
    const content = document.getElementById("content")!;
    if (!content) {
      console.error("Element content not found");
      return;
    }
    content.innerHTML = "";

    switch (page) {
      case "home":
        renderHome();
        break;
      case "tasks":
        //   renderTasks();
        break;
      case "document":
        createIzrzDocument();
        break;
    }
  }
}

export class NavigationController {
  private view: NavigationView;
  private model: NavigationModel;

  constructor() {
    this.view = new NavigationView();
    this.model = new NavigationModel();
    this.view.renderOnload((page) => this.model.navigate(page));
  }

  // Metoda do uruchomienia aplikacji
  run() {
    this.view.renderNavigation((page) => this.model.navigate(page));
  }
}
