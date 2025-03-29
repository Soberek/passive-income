export function renderHome() {
  const content = document.getElementById("content")!;

  // jak nie ma elementu content to wyrzucamy błąd
  if (!content) {
    console.error("Element content not found");
    return;
  }
  content.innerHTML = `<h1>Home pzdr</h1>`;
}
