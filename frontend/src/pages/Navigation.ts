// w tym pliku ogólna logika renderowania aplikacji

import { renderHome } from "./home";
// import { renderTasks } from "./pages/tasks";
import { createIzrzDocument } from "./createIzrzDocument";

import { SchoolController } from "./Schools/schoolsView";

type Page = "home" | "tasks" | "document" | "schools";

const pages: { name: Page; render: () => void }[] = [
  {
    name: "home",
    render: renderHome,
  },
  {
    name: "tasks",
    render: () => {
      console.log("Tasks page");
    },
  },
  {
    name: "document",
    render: createIzrzDocument,
  },
  {
    name: "schools",
    render: () => new SchoolController().render(),
  },
];

class NavigationView {
  renderNavigationOnload(navigate: (page: Page) => void) {
    document.addEventListener("DOMContentLoaded", () => {
      this.renderNavigation(navigate);
      navigate("home"); // Domyślnie renderuj stronę główną
    });
  }

  // renderNavigation to metoda, która renderuje nawigację
  // i dodaje do niej obsługę zdarzeń
  renderNavigation(navigate: (page: Page) => void) {
    const navigation = document.getElementById("navigation")!;

    const navLinks = pages
      .map(
        (page) =>
          `<li><a href="#" id="nav-${page.name}">${page.name.charAt(0).toUpperCase() + page.name.slice(1)}</a></li>`
      )
      .join("");

    navigation.innerHTML = `<ul>${navLinks}</ul>`;

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

    content.innerHTML = ""; // Wyczyść zawartość kontenera przed renderowaniem nowej strony

    const pageData = pages.find((p) => p.name === page);
    if (pageData) {
      pageData.render();
    } else {
      console.error(`No render function found for page: ${page}`);
    }
  }
}

export default class NavigationController {
  private view: NavigationView;
  private model: NavigationModel;

  constructor() {
    this.view = new NavigationView();
    this.model = new NavigationModel();
  }

  // Metoda do uruchomienia aplikacji
  run() {
    this.view.renderNavigationOnload((page) => this.model.navigate(page));
  }
}
