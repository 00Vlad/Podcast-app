import { Question } from "./question";
import { createModal, isValid } from "./utils";
import { authWithEmailAndPassword, getAuthForm } from "./auth";
import "./styles.css";

const modalBtn = document.getElementById("modal-btn");
const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
modalBtn.addEventListener("click", openModal);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
  event.preventDefault();

  if (!isValid(input.value)) return;

  const question = {
    text: input.value.trim(),
    date: new Date().toJSON(),
  };

  submitBtn.disabled = true;

  // Async request to server to save the question
  Question.create(question).then(() => {
    input.value = "";
    input.className = "";
    submitBtn.disabled = false;
  });
}

function openModal() {
  createModal("Authorization", getAuthForm());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector("#email");
  const password = event.target.querySelector("#password");

  authWithEmailAndPassword(email, password);
}
