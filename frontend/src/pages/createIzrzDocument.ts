//
import { addressList } from "../adresy.js";
declare global {
  interface Window {
    docxtemplater: any;
    saveAs: any;
    PizZip: any;
  }
}

export function createIzrzDocument() {
  const content = document.getElementById("content")!;

  // jak nie ma elementu content to wyrzucamy błąd
  if (!content) {
    console.error("Element content not found");
    return;
  }

  const variablesHTML = generateVariables();
  const formHTML = generateForm();

  content.innerHTML = `${variablesHTML}${formHTML}`;

  // funkcja, ktora pokazuje zmienne dostepne w dokumencie
  showVariableNames();

  // funkcja, ktora dodaje event listenery do button
  // dodatkowo dodaje adresy do select i opisy do textarea
  initializeForm();
}

// Tablica z adresami

// Tablica z opisami
const opisyArray: string[] = [
  "Inspekcja sanitarna lokalu Inspekcja sanitarna lokaluInspekcja sanitarna lokaluInspekcja sanitarna lokalu Inspekcja sanitarna lokaluInspekcja sanitarna lokaluInspekcja sanitarna lokaluInspekcja sanitarna lokaluInspekcja sanitarna lokaluInspekcja sanitarna lokalu",
  "Kontrola jakości żywności",
  "Badanie wody w basenie",
  "Nadzór nad placem zabaw",
];

function generateVariables() {
  return `    
      <div id="variables"">
        <h3>Zmienne dostępne</h3>
        <ol id="variable_names"></ol>
      </div>`;
}
function createInput(type: string, id: string, label: string) {
  return `<label>${label}: <input type="${type}" id="${id}" /></label><br />`;
}

function createTextarea(id: string, label: string, defaultValue = "") {
  return `<label>${label}: <textarea id="${id}">${defaultValue}</textarea></label><br />`;
}

function createSelect(id: string, label: string) {
  return `<label>${label}: <select id="${id}"></select></label><br />`;
}

function generateForm() {
  return `
    <form id="taskForm">
      <input type="file" id="templateFile" accept=".docx" /><br />

      ${createInput("text", "znak_sprawy", "Znak sprawy")}
      ${createInput("text", "numer_izrz", "Numer sprawy np. (17/2025)")}
      ${createInput("text", "program_name", "1. Zadanie realizowane w ramach (nazwa interwencji)")}
      ${createInput("text", "typ_zadania", "2. Forma zadania")}
      ${createSelect("adres", "3. Miejsce wykonania zadania (nazwa i adres instytucji)")}
      ${createInput("date", "data", "4. Termin wykonania zadania")}
      
      ${createInput("number", "viewer_count", "5.1. Grupa docelowa i liczba osób objętych zadaniem")}
      ${createTextarea(
        "viewer_count_description",
        "5.2. Grupa docelowa",
        "Grupa I:\nUczniowie szkoły podstawowej/przedszkolni - \nOpiekunowie grupy -"
      )}
      
      ${createSelect("opis_select", "6. Zakres uczestnictwa")}
      ${createTextarea("opis_zadania", "Zakres uczestnictwa (czynności wykonane w trakcie realizacji zadania)")}
      ${createTextarea("additional_info", "7. Uwagi, dodatkowe informacje")}
      
      <button type="button" id="generate">Generuj Word</button>
    </form>
  `;
}

const formatDate = (dateString: string): string => {
  // Sprawdzamy, czy dateString jest pusty lub niepoprawny
  if (!dateString || isNaN(new Date(dateString).getTime())) {
    return "Brak daty"; // lub domyślny format, np. "Brak daty"
  }

  const date = new Date(dateString);

  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const generateDocument = async () => {
  try {
    const templateFile = document.getElementById("templateFile") as HTMLInputElement;
    const znak_sprawy = document.getElementById("znak_sprawy") as HTMLInputElement;
    const numer_izrz = document.getElementById("numer_izrz") as HTMLInputElement;
    const program_name = document.getElementById("program_name") as HTMLInputElement;
    const typ_zadania = document.getElementById("typ_zadania") as HTMLInputElement;
    const adres = document.getElementById("adres") as HTMLSelectElement;
    const dataInput = document.getElementById("data") as HTMLInputElement;
    const data = formatDate(dataInput.value);
    const viewer_count = document.getElementById("viewer_count") as HTMLInputElement;
    const viewer_count_description = document.getElementById("viewer_count_description") as HTMLTextAreaElement;
    const opis_select = document.getElementById("opis_select") as HTMLSelectElement;
    const opis_zadania = document.getElementById("opis_zadania") as HTMLTextAreaElement;
    const dodatkowe_info = document.getElementById("additional_info") as HTMLTextAreaElement;

    const fileInput = document.getElementById("templateFile") as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Wybierz plik szablonu!");
      return;
    }
    const file = fileInput.files[0];
    const templateBuffer = await file.arrayBuffer();

    const zip = new window.PizZip(templateBuffer);
    const doc = new window.docxtemplater(zip);

    doc.setData({
      znak_sprawy: znak_sprawy.value,
      numer_izrz: numer_izrz.value,
      program_name: program_name.value,
      typ_zadania: typ_zadania.value,
      adres: adres.value,
      viewer_count: viewer_count.value,
      viewer_count_description: viewer_count_description.value,
      opis_zadania: opis_zadania.value,
      additional_info: dodatkowe_info.value,
      data,
    });
    doc.render();

    const output = doc.getZip().generate({ type: "blob" });
    // output = doc.getZip().generate({ type: "blob" });
    window.saveAs(
      output,
      `${numer_izrz.value.split("/").join("_")} - ${znak_sprawy.value} - ${data} - ${typ_zadania.value} - ${
        program_name.value
      } - ${adres.value}.docx`
    );
  } catch (error) {
    console.error("Błąd podczas generowania dokumentu:", error);
    alert("Wystąpił błąd. Sprawdź konsolę.");
  }
};

// async function generateListaObecnosci() {
//   try {
//     const templateFile = document.getElementById("templateFile") as HTMLInputElement;
//     const znak_sprawy = document.getElementById("znak_sprawy") as HTMLInputElement;
//     const numer_izrz = document.getElementById("numer_izrz") as HTMLInputElement;
//     const program_name = document.getElementById("program_name") as HTMLInputElement;
//     const typ_zadania = document.getElementById("typ_zadania") as HTMLInputElement;
//     const adres = document.getElementById("adres") as HTMLSelectElement;
//     const dataInput = document.getElementById("data") as HTMLInputElement;
//     const data = formatDate(dataInput.value);

//     const fileInput = document.getElementById("templateFile") as HTMLInputElement;
//     if (!fileInput.files || fileInput.files.length === 0) {
//       alert("Wybierz plik szablonu!");
//       return;
//     }
//     const file = fileInput.files[0];
//     const templateBuffer = await file.arrayBuffer();

//     const zip = new PizZip(templateBuffer);
//     const doc = new window.docxtemplater(zip);

//     doc.setData({
//       znak_sprawy: znak_sprawy.value,
//       numer_izrz: numer_izrz.value,
//       program_name: program_name.value,
//       typ_zadania: typ_zadania.value,
//       adres: adres.value,
//       data,
//     });
//     doc.render();

//     const output = doc.getZip().generate({ type: "blob" });
//     // output = doc.getZip().generate({ type: "blob" });
//     window.saveAs(
//       output,
//       `${numer_izrz.value.split("/").join("_")} - Lista obecności - ${znak_sprawy.value} - ${data} - ${
//         typ_zadania.value
//       } - ${adres.value}.docx`
//     );
//   } catch (error) {
//     console.error("Błąd podczas generowania dokumentu:", error);
//     alert("Wystąpił błąd. Sprawdź konsolę.");
//   }
// }

function showVariableNames() {
  const variables = [
    "templateFile",
    "znak_sprawy",
    "numer_izrz",
    "program_name",
    "typ_zadania",
    "adres",
    "data",
    "viewer_count",
    "viewer_count_description",
    "opis_select",
    "opis_zadania",
    "additional_info",
  ];

  const variablesList = document.getElementById("variable_names");

  variables.forEach((variable) => {
    const item = document.createElement("li");
    item.textContent = `{${variable}}`;
    variablesList?.appendChild(item);
  });
}

function initializeForm() {
  document.getElementById("generate")?.addEventListener("click", generateDocument);

  const selectAdres = document.getElementById("adres") as HTMLSelectElement;

  addressList.forEach((address) => {
    const option = document.createElement("option");
    option.value = address;
    option.textContent = address;
    selectAdres.appendChild(option);
  });

  const selectOpis = document.getElementById("opis_select") as HTMLSelectElement;
  const textareaOpis = document.getElementById("opis_zadania") as HTMLTextAreaElement;

  opisyArray.forEach((opis) => {
    const option = document.createElement("option");
    option.value = opis;
    option.textContent = opis;
    selectOpis.appendChild(option);
  });

  selectOpis.addEventListener("change", () => {
    textareaOpis.value = selectOpis.value;
  });

  document.getElementById("generate")?.addEventListener("click", generateDocument);
}
