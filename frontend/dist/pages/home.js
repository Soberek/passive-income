const goals = ["Stworzyć formularz generowania dokumentu informacji z realizacji zadania"];
// funkcja renderHome, która renderuje stronę główną
export function renderHome() {
    const content = document.getElementById("content");
    // jak nie ma elementu content to wyrzucamy błąd
    if (!content) {
        console.error("Element content not found");
        return;
    }
    content.appendChild(createOrderedList(goals));
}
function createListItem(text, index = 0) {
    const li = document.createElement("li");
    li.className = "home-list-item";
    li.innerText = `${++index}. ${text}`;
    return li;
}
function createOrderedList(arrayOfListItems) {
    const ol = document.createElement("ol");
    ol.type = "1";
    arrayOfListItems.forEach((element, index) => {
        const li = createListItem(element, index);
        ol.appendChild(li);
    });
    return ol;
}
