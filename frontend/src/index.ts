import { NavigationController } from "./pages/Navigation";
class App {
  private navigationController: NavigationController;

  constructor() {
    this.navigationController = new NavigationController();
  }

  run() {
    this.navigationController.run();
  }
}

// inicjalizacja podstawowego view
const app = new App();
app.run();
