import React, { useState } from "react";

const IzrzForm = () => {
  const [formData, setFormData] = useState({
    templateFile: null,
    caseNumber: "",
    reportNumber: "",
    programName: "",
    taskType: "",
    address: "",
    dateInput: "",
    viewerCount: 0,
    viewerCountDescription: "",
    taskDescription: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const [autocomplete, setAutocomplete] = useState("Szk");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      templateFile: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    // Create FormData directly from the form element
    const formDataToSend = new FormData(e.currentTarget);

    // Add the file manually since it might not be properly captured in the form element
    if (formData.templateFile) {
      formDataToSend.set("templateFile", formData.templateFile);
    }

    try {
      const response = await fetch("http://localhost:3000/api/offline_izrz", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const fileBlob = await response.blob();

      console.log(fileBlob.size);

      let filename = "report.docx";

      const disposition = response.headers.get("Content-Disposition");

      console.log(disposition);

      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("=")[1];
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(fileBlob);
      downloadLink.download = `${filename}`;
      downloadLink.click();

      setSubmitMessage({
        type: "success",
        text: "Report generated successfully! Download started.",
      });
    } catch (error) {
      console.error("Error generating document:", error);
      setSubmitMessage({
        type: "error",
        text: "Failed to generate document. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutocompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setAutocomplete(value);
  };

  const suggestions = returnAddressList().filter((address) => {
    return address.toLowerCase().includes(autocomplete.toLowerCase());
  });

  console.log(suggestions);

  return (
    <div>
      <h1>IZRZ Report Generation</h1>

      {submitMessage.text && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            borderRadius: "0.25rem",
            backgroundColor: submitMessage.type === "success" ? "#d1fae5" : "#fee2e2",
            color: submitMessage.type === "success" ? "#065f46" : "#991b1b",
          }}
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label>Case Number:</label>
            <input type="text" name="caseNumber" value={formData.caseNumber} onChange={handleChange} required />
          </div>

          <div>
            <label>Report Number:</label>
            <input type="text" name="reportNumber" value={formData.reportNumber} onChange={handleChange} required />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label>Program Name:</label>
            <input type="text" name="programName" value={formData.programName} onChange={handleChange} required />
          </div>

          <div>
            <label>Task Type:</label>
            <input type="text" name="taskType" value={formData.taskType} onChange={handleChange} required />
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <label htmlFor="autocomplete">Auto complete</label>
          <input
            type="text"
            id="autocomplete"
            name="autocomplete"
            value={autocomplete}
            onChange={handleAutocompleteChange}
            required
          />
          {/* List of autocomplete options */}
          {/* Type in input, based on that filter suggestions */}
          {/* on suggestion clicked fill some input */}

          <ul
            style={{
              position: "absolute",
              top: "100%", // Place the dropdown below the input field
              left: 0,
              width: "100%", // Ensure it matches the width of the input field
              maxHeight: "200px", // Limit the dropdown height to avoid overflowing
              overflowY: "auto", // Allow vertical scrolling if there are many suggestions
              backgroundColor: "white", // Background color of the dropdown
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for 3D effect
              borderRadius: "4px", // Rounded corners
              padding: "0", // Remove padding from the list
              margin: "0", // Remove margin
              zIndex: 10, // Ensure it appears on top of other content
            }}
          >
            {suggestions.map((address, index) => (
              <li
                key={index}
                style={{
                  padding: "10px", // Padding for each item
                  borderBottom: "1px solid #ddd", // Separator between items
                  listStyleType: "none", // Remove default list styling
                  cursor: "pointer", // Show pointer cursor on hover
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white", // Alternate background color
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")} // Hover effect
                onMouseLeave={(e) => (e.target.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "white")} // Reset hover effect
              >
                {address}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label>Date:</label>
            <input type="date" name="dateInput" value={formData.dateInput} onChange={handleChange} required />
          </div>

          <div>
            <label>Viewer Count:</label>
            <input
              type="number"
              name="viewerCount"
              value={formData.viewerCount}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Viewer Count Description:</label>
          <input
            type="text"
            name="viewerCountDescription"
            value={formData.viewerCountDescription}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Task Description:</label>
          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleChange}
            required
            style={{ width: "100%", minHeight: "100px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Additional Information:</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            required
            style={{ width: "100%", minHeight: "100px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Template File:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="file" name="templateFile" onChange={handleFileChange} required />
            {formData.templateFile && (
              <span style={{ marginLeft: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                {formData.templateFile.name}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: isSubmitting ? "#93c5fd" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? (
              <>
                <svg
                  style={{
                    animation: "spin 1s linear infinite",
                    marginRight: "0.75rem",
                    height: "1.25rem",
                    width: "1.25rem",
                    display: "inline-block",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    style={{ opacity: 0.25 }}
                  ></circle>
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Generate Report"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IzrzForm;

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
