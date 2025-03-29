// w tym pliku ogólna logika renderowania aplikacji
import { renderHome } from "./pages/home.js";
// import { renderTasks } from "./pages/tasks";
import { createIzrzDocument } from "./pages/createIzrzDocument.js"; // strona do generowania izrz

type Page = "home" | "tasks" | "document";

function renderNavigation() {
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

function navigate(page: Page) {
  // trzeba wyczyścić zawartość contentu poprzedniego po wywołaniu funkcji
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

// inicjalizacja podstawowego view
document.addEventListener("DOMContentLoaded", () => {
  renderNavigation();
  navigate("home");
});

export { navigate };
