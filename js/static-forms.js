
document.addEventListener("DOMContentLoaded", () => {
  const formIds = ["contact-form", "mentor-interest-form", "support-request-form"];
  formIds.forEach((id) => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("This form is being connected. Please check back soon.");
    });
  });
});
