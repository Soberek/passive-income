// will generate izrz based on data provided by the user
// and generate .docx file
import PizZip from "pizzip";
import docxtemplater from "docxtemplater";

// Model for the Izrz document
interface ReportDataModel {
  templateFile: File;
  caseNumber: string;
  reportNumber: string;
  programName: string;
  taskType: string;
  address: string;
  dateInput: Date;
  viewerCount: number;
  viewerCountDescription: string;
  taskDescription: string;
  additionalInfo: string;
}

export class Report implements ReportDataModel {
  templateFile: File;
  caseNumber: string;
  reportNumber: string;
  programName: string;
  taskType: string;
  address: string;
  dateInput: Date;
  viewerCount: number;
  viewerCountDescription: string;
  taskDescription: string;
  additionalInfo: string;
  constructor(data: ReportDataModel) {
    this.templateFile = data.templateFile;
    this.caseNumber = data.caseNumber;
    this.reportNumber = data.reportNumber;
    this.programName = data.programName;
    this.taskType = data.taskType;
    this.address = data.address;
    this.dateInput = data.dateInput;
    this.viewerCount = data.viewerCount;
    this.viewerCountDescription = data.viewerCountDescription;
    this.taskDescription = data.taskDescription;
    this.additionalInfo = data.additionalInfo;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.caseNumber.trim()) {
      errors.push("Case number is required.");
    }

    if (!this.reportNumber.trim()) {
      errors.push("Report number is required.");
    }

    if (this.viewerCount < 0) {
      errors.push("Viewer count cannot be negative.");
    }

    if (!(this.dateInput instanceof Date) || isNaN(this.dateInput.getTime())) {
      errors.push("Invalid date.");
    }

    return errors;
  }
}

export class IzrzRepository {
  constructor() {}

  // data will be passed from frontend
  // and will be used to generate izrz document
  generateIzrz = async (data: ReportDataModel): Promise<Blob | void> => {
    const report = new Report(data);
    const validationErrors = report.validate();

    if (validationErrors.length) {
      throw new Error("Niepoprawne dane: " + validationErrors.join(", "));
    }
    const {
      templateFile,
      caseNumber,
      reportNumber,
      programName,
      taskType,
      address,
      dateInput,
      viewerCount,
      viewerCountDescription,
      taskDescription,
      additionalInfo,
    } = report;

    if (!templateFile) {
      throw new Error("Szablon nie został wybrany.");
    }

    const file = templateFile;
    const templateBuffer = await file.arrayBuffer();

    const zip = new PizZip(templateBuffer);
    const doc = new docxtemplater(zip);

    doc.setData({
      znak_sprawy: caseNumber,
      numer_izrz: reportNumber,
      nazwa_programu: programName,
      typ_zadania: taskType,
      adres: address,
      liczba_osob: viewerCount,
      liczba_osob_opis: viewerCountDescription,
      opis_zadania: taskDescription,
      dodatkowe_informacje: additionalInfo,
      data: formatDate(dateInput.toString()),
    });

    // This is the line that renders the document
    // It will replace the variables in the template with the data provided
    doc.render();

    // This is the line that generates the document
    // It will create a blob object that can be saved as a file
    // blob is a binary large objectary data
    const output = doc.getZip().generate({ type: "blob" });

    // Return the output blob to the frontend

    return output as Blob;

    // Process the document using docxtemplate
  };
}

export class IzrzService {
  private repo: IzrzRepository;
  constructor(izrzRepository: IzrzRepository) {
    this.repo = izrzRepository;
  }

  async generateIzrzDocument(data: ReportDataModel): Promise<Blob | void> {
    const report = new Report(data);

    const errors = report.validate();

    if (errors.length) {
      throw new Error("Invalid data: " + errors.join(", "));
    }

    try {
      return await this.repo.generateIzrz(data);
    } catch (error: any) {
      throw new Error("Error generating Izrz document: " + error.message);
    }
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Brak daty"; // Return default value for invalid dates
  }
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function returnAddressList() {
  const addressList = [
    "Szkoła Podstawowa nr 1 im. Tadeusza Kościuszki w Barlinku, ul. Jeziorna 12, 74-320 Barlinek",
    "Szkoła Podstawowa nr 4 im. Henryka Sienkiewicza w Barlinku, ul. Kombatantów 3, 74-320 Barlinek",
    "Szkoła Policealna dla dorosłych w Barlinku, ul. Szosowa 2, 74-320 Barlinek",
    "Szkoła Przysposabiająca do Pracy, ul. Sienkiewicza 15, 74-320 Barlinek",
    "Technikum nr 1 w Barlinku, ul. Szosowa 2, 74-320 Barlinek",
    "Żłobek miejski w Barlinku, ul. Podwale 11, 74-320 Barlinek",
    "Ośrodek Szkolenia i Wychowania Ochotniczych Hufców Pracy w Barlinku, ul. Św. Bonifacego 36, 74-320 Barlinek",
    "Niepubliczna Szkoła Podstawowa w Barnówku, Barnówko, 74-311 Różańsko",
    "Niepubliczne Małe Przedszkole w Barnówku, Barnówko, 74-311 Różańsko",
    "Przedszkole Gminne w Boleszkowicach, ul. Słoneczna 24a, 74-407 Boleszkowice",
    "Szkoła Podstawowa im. Bolesława Chrobrego w Boleszkowicach, Pl. Bolesława Chrobrego 3 oraz ul. Słoneczna 24 (IV-VIII), 74-407 Boleszkowice",
    "Punkt Przedszkolny 'Puchatek' w Cychrach, ul. Jana Pawła II 66/5, 74-404 Cychry",
    "Szkoła Podstawowa im. Marii Konopnickiej w Sarbinowie, Sarbinowo 80, 74-404 Cychry",
    "Szkoła Podstawowa im. Władysława St. Reymonta w Cychrach, ul. Jana Pawła II 85, 74-404 Cychry",
    "Niepubliczne Przedszkole Montessori z oddziałami integracyjnymi i specjalnymi Żaneta Rybińska-Prostak, Joanna Kujawa S.C.",
    "Branżowa Szkoła I Stopnia w Dębnie, ul. Zachodnia 4, 74-400 Dębno",
    "I Liceum Ogólnokształcące w Dębnie, ul. Zachodnia 4, 74-400 Dębno",
    "Niepubliczna Szkoła Podstawowa w Dębnie, ul. Baczewskiego 20, 74-400 Dębno",
    "Niepubliczne Liceum Ogólnokształcące, ul. Baczewskiego 20, 74-400 Dębno",
    "Przedszkole Specjalnego Towarzystwa Salezjańskiego im. Św. Jana Bosko, ul. Mickiewicza 33, 74-400 Dębno",
    "Niepubliczne Przedszkole Towarzystwa Salezjańskiego im. Św. Jana Bosko, Plac Konstytucji 3 Maja 2, 74-400 Dębno",
    "Przedszkole nr 1 Czarodziejska Kraina w Dębnie, ul. Kościuszki 6, 74-400 Dębno",
    "Przedszkole nr 2 im. Stanisławy Modrzejewskiej w Dębnie, ul. Jana Pawła II 42, 74-400 Dębno",
    "Szkoła Podstawowa nr 1 im. KEN w Dębnie, ul. Marszałka J. Piłsudskiego 10, 74-400 Dębno",
    "Szkoła Podstawowa nr 2 im. Arkadego Fiedlera w Dębnie, ul. Jana Pawła II 1, 74-400 Dębno",
    "Szkoła Podstawowa nr 3 im. J. Dąbrowskiego, ul. J. Słowackiego 21, 74-400 Dębno",
    "Szkoła Podstawowa Towarzystwa Salezjańskiego im. św. Jana Bosko w Dębnie, ul. Mickiewicza 33, 74-400 Dębno",
    "Szkoła Policealna dla Dorosłych w Dębnie, ul. Zachodnia, 74-400 Dębno",
    "Żłobek Gminny w Dębnie, ul. Jana Pawła II 42, 74-400 Dębno",
    "Szkoła Podstawowa im. Adama Mickiewicza w Golenicach, Golenice 1a, 74-300 Myślibórz",
    "Przedszkole Gminne w Karsku, ul. Gorzowska 9, 74-305 Karsko",
    "Szkoła Podstawowa im. H. Ch. Andersena w Karsku, ul. Gorzowska 9, 74-305 Karsko",
    "Szkoła Podstawowa im. Janusza Korczaka w Kierzkowie, Kierzków 69, 74-300 Myślibórz",
    "Szkoła Podstawowa im. Jana Pawła II w Mostkowie, 74-322 Mostkowo 37D",
    "Branżowa Szkoła I Stopnia Nr 2 w Myśliborzu, ul. Strzelecka 51, 74-300 Myślibórz",
    "Liceum Ogólnokształcące im. Noblistów Polskich, ul. Za bramką 8, 74-300 Myślibórz",
    "Młodzieżowy Ośrodek Socjoterapii w Myśliborzu, ul. Marcinkowskiego 10, 74-300 Myślibórz",
    "Niepubliczne Przedszkole im. Żwirka i Muchomorka, ul. Armii Polskiej 13, 74-300 Myślibórz",
    "Oddział I Żłobka Miejskiego w Myśliborzu, ul. Spokojna 22, 74-300 Myślibórz",
    "Przedszkole Publiczne Nr 1 'Zielona Dolinka' w Myśliborzu",
    "Przedszkole Publiczne nr 2 Misia Uszatka, ul. Spokojna 12, 74-300 Myślibórz",
    "Specjalny Ośrodek Szkolno-Wychowawczy TPD w Myśliborzu, ul. Pileckiego 27/Spokojna 22, 74-300 Myślibórz",
    "Szkoła Podstawowa nr 2 im. Janusza Kusocińskiego w Myśliborzu, ul. Piłsudskiego 18, 74-300 Myślibórz",
    "Szkoła Podstawowa nr 3 im. Leonida Teligi w Myśliborzu, ul. Lipowa 18a, 74-300 Myślibórz",
    "Szkoła Policealna w Myśliborzu, ul. Strzelecka 51, 74-300 Myślibórz",
    "Technikum nr 1 w Myśliborzu, ul. Strzelecka 51, 74-300 Myślibórz",
    "Technikum nr 2 w Myśliborzu, ul. Za Bramką 8, 74-300 Myślibórz",
    "Żłobek miejski w Myśliborzu, ul. Spokojna 15, 74-300 Myślibórz",
    "Szkoła Podstawowa im. Jana Brzechwy w Nawrocku, Nawrocko 11, 74-300 Myślibórz",
    "Szkoła Podstawowa im. Unii Europejskiej, ul. Szkolna 4, 74-304 Nowogródek Pomorski",
    "Szkoła Podstawowa im. Kornela Makuszyńskiego w Różańsku, 74-311 Różańsko 87",
    "Niepubliczne Przedszkole 'Małe Przedszkole' w Rychnowie",
    "Młodzieżowy Ośrodek Socjoterapii w Smolnicy, Smolnica 51, 74-400 Dębno",
    "Szkoła Podstawowa nr 1 im. Młodych Talentów w Smolnicy, Smolnica 21, 74-400 Dębno",
  ];

  return addressList;
}
