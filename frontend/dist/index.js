import NavigationController from "./pages/Navigation.js";
class App {
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
