import { createUser, red } from "./requests.js";
import { toastEmptyInput } from "./toast.js";

const handleNewUser = () => {
  const inputs = document.querySelectorAll("input");
  const registerButton = document.querySelector("#register");
  let count = 0;
  const newUser = {};

  registerButton.addEventListener("click", async (e) => {
    e.preventDefault();

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }

      newUser[input.name] = input.value.trim();
    });

    if (count !== 0) {
      count = 0;
      return toastEmptyInput(
        "Por favor, preencha todos os campos de cadastro",
        red
      );
    } else {
      await createUser(newUser);
    }
  });
};

const loginBackButtons = () => {
  const buttons = document.querySelectorAll(".login-back__button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      location.replace("../../");
    });
  });
};

handleNewUser();
loginBackButtons();
