// one mvc for root (render, navigation)
// one mvc for home

class GenerateRaportView {
  render() {
    const container = document.getElementById("content");
    if (!container) return;

    container.innerHTML = `
      <h1>Generowanie raportu</h1>
      <div>
        <input type="file" id="templateFile" accept=".docx" />
        ${this.createInputElement("znak_sprawy", "text", "Znak sprawy", "Znak sprawy")}
        ${this.createInputElement("numer_izrz", "text", "Numer IZRZ", "Numer IZRZ")}
        ${this.createInputElement("adres", "text", "Adres", "Adres")}
        ${this.createInputElement("data", "date", "", "Data")}
        ${this.createInputElement("typ_zadania", "text", "Typ zadania", "Typ zadania")}
        ${this.createInputElement("program_name", "text", "", "Nazwa programu")}
        <button id="generateRaportButton">Generuj raport</button>
      </div>
    `;

    const generateButton = document.getElementById("generateRaportButton");
    if (generateButton) {
      generateButton.addEventListener("click", () => {
        // this.generateRaport();
      });
    }
  }

  createInputElement(id: string, type: string, placeholder: string, labelText: string): HTMLInputElement {
    const input = document.createElement("input");
    const label = document.createElement("label");
    label.textContent = labelText;
    input.id = id;
    input.type = type;
    input.placeholder = placeholder;
    return input;
  }
}
