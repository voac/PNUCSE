const enterBtn = document.getElementById("enterBtn");
const nameInput = document.getElementById("nameInput");
const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const welcomeText = document.getElementById("welcomeText");
var guideModal = document.getElementById('guideModal');

enterBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    welcomeText.textContent = `${name}님, 반가워요! 👋`;
    intro.classList.add("hidden");
    mainPage.classList.remove("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    window.location.href = "mailto:aiden@example.com";
  }
});

function openGuideModal() {
    guideModal.style.display = 'block';
}

function closeGuideModal() {
    guideModal.style.display = 'none';
}