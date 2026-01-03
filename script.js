/********************************
 USER DATABASE
********************************/
let users = JSON.parse(localStorage.getItem("users")) || {};

/***************
 SIGNUP
********************/
function signup() {
  let user = document.getElementById("suUser").value.trim();
  let pass = document.getElementById("suPass").value.trim();

  if (user === "" || pass === "") {
    alert("Fill all fields");
    return;
  }

  if (users[user]) {
    alert("Username already exists");
    return;
  }
  users[user] = pass;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Now login.");
}

/********************************
 LOGIN
********************************/
function login() {
  let user = document.getElementById("liUser").value.trim();
  let pass = document.getElementById("liPass").value.trim();
  let error = document.getElementById("error");

  if (users[user] && users[user] === pass) {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "notes.html";
  } else {
    error.innerText = "Invalid username or password";
  }
}

/********************************
 LOGOUT
********************************/
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

/********************************
 NOTES PAGE
********************************/
if (document.getElementById("notesList")) {

  // 🔒 protection
  let user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "index.html";
  }

  let currentFolder = "personal";

  let allNotes =
    JSON.parse(localStorage.getItem("allNotes")) || {};

  if (!allNotes[user]) {
    allNotes[user] = {
      personal: [],
      study: [],
      work: []
    };
  }

  function selectFolder(folder) {
    currentFolder = folder;
    document.getElementById("folderTitle").innerText =
      folder.toUpperCase();
    showNotes();
  }

  function addNote() {
    let input = document.getElementById("noteInput");
    let text = input.value.trim();

    if (text === "") return;

    allNotes[user][currentFolder].push(text);
    localStorage.setItem("allNotes", JSON.stringify(allNotes));

    input.value = "";
    showNotes();
  }

  function showNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    allNotes[user][currentFolder].forEach((note, index) => {
      list.innerHTML += `
        <div class="note">
          ${note}
          <button onclick="deleteNote(${index})">X</button>
        </div>
      `;
    });
  }

  function deleteNote(index) {
    allNotes[user][currentFolder].splice(index, 1);
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
    showNotes();
  }

  showNotes();

  // expose functions to HTML
  window.addNote = addNote;
  window.selectFolder = selectFolder;
  window.deleteNote = deleteNote;
}

