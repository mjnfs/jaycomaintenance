const API_URL = ""; // later

const formEmailName = document.querySelector("#form-email-name");
const formEmailEmail = document.querySelector("#form-email-email");
const formSubject = document.querySelector("#form-subject");
const formMessage = document.querySelector("#form-message");

const buttonSubmit = document.querySelector("#formEmailsubmitButton");
const loading = document.querySelector("#formEmailLoadingRe");
const formEmailSuccessRe = document.querySelector("#formEmailSuccessRe");

buttonSubmit.addEventListener("click", (event) => {
  loading.classList.remove("d-none");
  buttonSubmit.classList.add("d-none");
  const data = {
    email: formEmailEmail.value,
    name: formEmailName.value,
    subject: formSubject.value,
    message: formMessage.value,
  };

  event.preventDefault();
  fetch(`${API_URL}/api/sendEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        loading.classList.add("d-none");
        buttonSubmit.classList.remove("d-none");
        formEmailSuccessRe.classList.remove("d-none");

        setTimeout(() => {
          formEmailSuccessRe.classList.add("d-none");
        }, 2000);

        formEmailName.value = "";
        formEmailEmail.value = "";
        formSubject.value = "";
        formMessage.value = "";
      }
    })
    .catch((error) => {
      console.error(error);
    });
});