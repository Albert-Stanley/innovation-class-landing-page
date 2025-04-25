document.addEventListener("DOMContentLoaded", function () {
  function setupSearch(inputId, feedbackId, formSelector) {
    const input = document.getElementById(inputId);
    const feedback = document.getElementById(feedbackId);
    const form = document.querySelector(formSelector);
    const feedbackText = feedback?.querySelector(".feedback-text");
    const closeButton = feedback?.querySelector(".close-feedback");

    if (!input || !feedback || !form || !feedbackText || !closeButton) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const term = input.value.trim();

      if (term) {
        feedbackText.textContent = `Você buscou por: '${term}'`;
        feedback.classList.remove("d-none");
        requestAnimationFrame(() => feedback.classList.add("show")); // fade in
      } else {
        feedback.classList.remove("show");
        setTimeout(() => feedback.classList.add("d-none"), 300); // fade out
      }
    });

    closeButton.addEventListener("click", function () {
      feedback.classList.remove("show");
      setTimeout(() => feedback.classList.add("d-none"), 300);
    });
  }

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

  document.addEventListener("click", function (e) {
    const feedbacks = [
      document.getElementById("searchFeedbackMobile"),
      document.getElementById("searchFeedbackDesktop"),
    ];
    const inputs = [
      document.getElementById("searchInputMobile"),
      document.getElementById("searchInputDesktop"),
    ];

    feedbacks.forEach((feedback, index) => {
      const input = inputs[index];
      if (
        feedback &&
        !feedback.classList.contains("d-none") &&
        !feedback.contains(e.target) &&
        !input.contains(e.target)
      ) {
        feedback.classList.remove("show");
        setTimeout(() => feedback.classList.add("d-none"), 300);
      }
    });
  });
});

// Impede que os links falsos naveguem para outro lugar, mantendo apenas o visual de link
document.querySelectorAll(".fake-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
  });
});
