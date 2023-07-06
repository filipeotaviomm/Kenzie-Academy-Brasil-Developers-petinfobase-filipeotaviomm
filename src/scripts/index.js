import { toastEmptyInput } from "./toast.js";
import { loginRequest, getUserProfileInfos, red } from "./requests.js";

const authentication = () => {
  const token = localStorage.getItem("@petInfo:token");

  if (token) {
    location.replace("./src/pages/dashboard.html");
  }
};

const handleLogin = () => {
  const inputs = document.querySelectorAll("input");
  const enterButton = document.querySelector(".confirm__button");
  const loginBody = {};
  let count = 0;

  enterButton.addEventListener("click", async (e) => {
    e.preventDefault();

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }

      loginBody[input.name] = input.value.trim();
    });

    if (count !== 0) {
      count = 0;
      return toastEmptyInput(
        "Por favor, preencha todos os campos de login",
        red
      );
    } else {
      await loginRequest(loginBody);
      await getUserProfileInfos();
    }
  });
};

const signupButton = () => {
  const button = document.querySelector("#button__signup");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    location.replace("./src/pages/signup.html");
  });
};

authentication();
handleLogin();
signupButton();
