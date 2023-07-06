import { renderHeader, renderPosts } from "./render.js";
import { handleModalcreatePost } from "./modal.js";
import { toastEmptyInput } from "./toast.js";
import {
  createPost,
  getAllPosts,
  updatePostById,
  getUserProfileInfos,
  red,
} from "./requests.js";

// const userInfo = await getUserProfileInfos();
// console.log(userInfo);

// const posts = await getAllPosts();
// console.log(posts);

export const handleCreatePost = () => {
  const modalContainer = document.querySelector(".modalController__createPost");
  const inputs = document.querySelectorAll(".add__input");
  const publishButton = document.querySelector(".publishButton");
  const postBody = {};
  let count = 0;

  publishButton.addEventListener("click", async (e) => {
    e.preventDefault();

    inputs.forEach((input) => {
      if (input.value == "") {
        count++;
      }

      postBody[input.name] = input.value.trim();
    });

    if (count !== 0) {
      count = 0;
      return toastEmptyInput(
        "Por favor, preencha todos os campos do post",
        red
      );
    } else {
      await createPost(postBody);
      renderPosts();
      modalContainer.close();
      inputs.forEach((input) => {
        input.value = "";
      });
    }
  });
};

const authentication = () => {
  const token = localStorage.getItem("@petInfo:token");

  if (!token) {
    location.replace("../../");
  }
};

const logoutOpenCard = () => {
  const photoButton = document.querySelector(".photo__button");
  const toastLogout = document.querySelector(".toast__logout");
  const main = document.querySelector("main");

  photoButton.addEventListener("click", () => {
    toastLogout.classList.toggle("hidden");
  });

  main.addEventListener("click", () => {
    if (!toastLogout.classList.contains("hidden")) {
      toastLogout.classList.add("hidden");
    }
  });

  logoutButton();
};

const logoutButton = () => {
  const buttonLogout = document.querySelector(".button__logout");

  buttonLogout.addEventListener("click", () => {
    location.replace("../../");
    localStorage.clear();
  });
};

renderHeader();
renderPosts();
authentication();
logoutOpenCard();
handleModalcreatePost();

// updatePostById("466993f0-7be0-47c6-b108-999d2e924a7d", {
//   title: "Teste de atualização",
//   content: "Apenas um teste Apenas um teste Apenas um teste",
// });

// console.log(await getAllPosts());
