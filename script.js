/******** LOGIN PAGE CODE ********/
if (document.getElementById("username")) {

  function login() {
    let name = document.getElementById("username").value;

    if (name === "") {
      alert("Enter name");
      return;
    }

    localStorage.setItem("user", name);
    window.location.href = "notes.html";
  }

}

/******** NOTES PAGE CODE ********/
if (document.getElementById("notesList")) {

  let currentFolder = "personal";

  let data = JSON.parse(localStorage.getItem("notesData")) || {
    personal: [],
    study: [],
    work: []
  };

  function selectFolder(folder) {
    currentFolder = folder;
    document.getElementById("folderTitle").innerText =
      folder.toUpperCase();
    showNotes();
  }

  function addNote() {
    let input = document.getElementById("noteInput");
    let text = input.value;

    if (text === "") return;

    data[currentFolder].push(text);
    localStorage.setItem("notesData", JSON.stringify(data));

    input.value = "";
    showNotes();
  }

  function showNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    data[currentFolder].forEach((note, index) => {
      list.innerHTML += `
        <div class="note">
          ${note}
          <button class="delete-btn"
            onclick="deleteNote(${index})">X</button>
        </div>
      `;
    });
  }

  function deleteNote(index) {
    data[currentFolder].splice(index, 1);
    localStorage.setItem("notesData", JSON.stringify(data));
    showNotes();
  }

  showNotes();
}
