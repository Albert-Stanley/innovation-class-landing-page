document.addEventListener("DOMContentLoaded", function () {
  // Inicializa a funcionalidade de busca para os formulários (mobile e desktop)
  function setupSearch(inputId, feedbackId, formSelector) {
    const input = document.getElementById(inputId);
    const feedback = document.getElementById(feedbackId);
    const form = document.querySelector(formSelector);

    if (!input || !feedback || !form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const term = input.value.trim();

      if (term) {
        feedback.textContent = `Você buscou por: '${term}'`;
        feedback.classList.remove("d-none");
      } else {
        feedback.classList.add("d-none");
      }
    });
  }

  // Configura a busca separadamente para mobile e desktop
  setupSearch(
    "searchInputMobile",
    "searchFeedbackMobile",
    ".d-lg-none .search-container"
  );
  setupSearch(
    "searchInputDesktop",
    "searchFeedbackDesktop",
    ".d-lg-flex .search-container"
  );
});

// Impede que os links falsos naveguem para outro lugar, mantendo apenas o visual de link
document.querySelectorAll(".fake-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
  });
});
