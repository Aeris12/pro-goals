const input = document.getElementById("goalInput");
const list = document.getElementById("goalList");

// Ładowanie zapisanych celów
const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
savedGoals.forEach(text => addGoalToList(text));

// Dodawanie nowego celu
function addGoal() {
  const text = input.value.trim();
  if (!text) return;
  addGoalToList(text);
  input.value = "";
  saveGoals();
}

// Dodanie celu do listy DOM
function addGoalToList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const renameBtn = document.createElement("button");
  renameBtn.textContent = "✏️";
  renameBtn.onclick = () => {
    const newText = prompt("Edytuj cel:", span.textContent);
    if (newText) {
      span.textContent = newText;
      saveGoals();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => {
    li.remove();
    saveGoals();
  };

  li.appendChild(span);
  li.appendChild(renameBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Zapis do localStorage
function saveGoals() {
  const texts = [...list.querySelectorAll("li span")].map(span => span.textContent);
  localStorage.setItem("goals", JSON.stringify(texts));
}
