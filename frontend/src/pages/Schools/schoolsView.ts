class SchoolView {
  constructor() {}

  render() {
    const container = document.getElementById("app");
    if (container) {
      container.innerHTML = `
        <div>
          <h1>School View</h1>
          <p>This is the school view page.</p>
        </div>
      `;
    }
  }
}

export class SchoolController {
  private schoolView: SchoolView;

  constructor() {
    this.schoolView = new SchoolView();
  }

  render() {
    this.schoolView.render();
  }
}
// Initialize the SchoolController and render the view
