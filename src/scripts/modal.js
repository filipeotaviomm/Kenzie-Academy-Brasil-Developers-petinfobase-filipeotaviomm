import { handleCreatePost } from "./dashboard.js";
import { renderPosts } from "./render.js";
import {
  getAllPosts,
  updatePostById,
  deletePostbyId,
  red,
} from "./requests.js";
import { toastEmptyInput } from "./toast.js";

const closeCreatePostModal = () => {
  const closeModalButtons = document.querySelectorAll(".closeCreatePostModal");
  const modalContainer = document.querySelector(".modalController__createPost");
  const inputsTitle = document.querySelector("#postTitle");
  const inputsContent = document.querySelector("#postContent");

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      modalContainer.close();
      inputsTitle.value = "";
      inputsContent.value = "";
    });
  });
};

export const handleModalcreatePost = () => {
  const modalController = document.querySelector(
    ".modalController__createPost"
  );
  const createPostButton = document.querySelector(".confirm__button");

  createPostButton.addEventListener("click", () => {
    modalController.showModal();
    closeCreatePostModal();
  });
  handleCreatePost();
};

const closeEditPostModal = () => {
  const buttonsCloseModal = document.querySelectorAll(".closeEditPostModal");
  const modalContainer = document.querySelector(".modalController__editPost");
  const inputsTitle = document.querySelector("#titleUpdate");
  const inputsContent = document.querySelector("#descriptionUpdate");

  buttonsCloseModal.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      inputsTitle.value = "";
      inputsContent.value = "";
      localStorage.removeItem("@petInfo:postId");
      modalContainer.close();
    });
  });
};

export const updateEditedPost = () => {
  const buttonSave = document.querySelector(".saveButton");
  const inputTitle = document.querySelector("#titleUpdate");
  const inputContent = document.querySelector("#descriptionUpdate");
  const modalEditPost = document.querySelector(".modalController__editPost");
  let postBody = {};
  let count = 0;

  buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    const postId = localStorage.getItem("@petInfo:postId");

    if (inputTitle.value === "" || inputContent.value === "") {
      count++;
    }

    if (count !== 0) {
      count = 0;
      return toastEmptyInput(
        "Por favor, preencha todos os campos do post",
        red
      );
    } else {
      postBody = {
        title: inputTitle.value.trim(),
        content: inputContent.value.trim(),
      };
      await updatePostById(postId, postBody);
      renderPosts();
      modalEditPost.close();
      localStorage.removeItem("@petInfo:postId");
    }
  });
};

export const handleModalEditPost = () => {
  const editButtons = document.querySelectorAll(".edit__button");
  const modalEditPost = document.querySelector(".modalController__editPost");
  const inputTitle = document.querySelector("#titleUpdate");
  const inputContent = document.querySelector("#descriptionUpdate");

  editButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const datasetButton = e.target.dataset.editId;
      const allPosts = await getAllPosts();
      allPosts.forEach((post) => {
        if (post.id === datasetButton) {
          inputTitle.value = post.title;
          inputContent.value = post.content;
          localStorage.setItem("@petInfo:postId", datasetButton);
        }
      });
      modalEditPost.showModal();
    });
  });
  closeEditPostModal();
};

const closeExcludeModal = () => {
  const closeButtons = document.querySelectorAll(".closeExcludePostModal");
  const modalContainer = document.querySelector(
    ".modalController__excludePost"
  );

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem("@petInfo:postId");
      modalContainer.close();
    });
  });
};

export const excludePost = () => {
  const confirmationExcludeButton = document.querySelector(
    "#excludeConfirmationButton"
  );
  const modalController = document.querySelector(
    ".modalController__excludePost"
  );

  confirmationExcludeButton.addEventListener("click", async () => {
    const postId = localStorage.getItem("@petInfo:postId");
    await deletePostbyId(postId);
    renderPosts();
    modalController.close();
    localStorage.removeItem("@petInfo:postId");
  });
};

export const handleExcludePostModal = () => {
  const excludeButtons = document.querySelectorAll(".exclude__button");
  const modalContainer = document.querySelector(
    ".modalController__excludePost"
  );

  excludeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const datasetButtonExclude = e.target.dataset.excludeId;
      localStorage.setItem("@petInfo:postId", datasetButtonExclude);
      modalContainer.showModal();
    });
  });
  closeExcludeModal();
};

const closeOpenPostModal = () => {
  const closeButton = document.querySelector(".closePost__button");
  const modalContainer = document.querySelector(
    ".modalController__displayPost"
  );

  closeButton.addEventListener("click", () => {
    modalContainer.close();
  });
};

export const handleOpenPostModal = async () => {
  const accessPublicButton = document.querySelectorAll(".accessPublic__button");
  const arrayPosts = await getAllPosts();
  const photoAvatar = document.querySelector(".photo__avatar-modal");
  const name = document.querySelector(".nameUser");
  const date = document.querySelector(".date");
  const postTitle = document.querySelector(".post__title-modal");
  const postContent = document.querySelector(".post__content-modal");
  const modalContainer = document.querySelector(
    ".modalController__displayPost"
  );

  accessPublicButton.forEach((button) => {
    button.addEventListener("click", () => {
      modalContainer.showModal();

      const result = arrayPosts.find(
        (post) => post.id === button.dataset.buttonId
      );

      photoAvatar.src = result.user.avatar;
      name.innerHTML = result.user.username;
      date.innerHTML = new Date(result.createdAt).toLocaleDateString();
      postTitle.innerHTML = result.title;
      postContent.innerHTML = result.content;

      // pode fazer com o find() ou com o forEach()
      // arrayPosts.forEach((post) => {
      //   if (post.id === button.dataset.buttonId) {
      //     photoAvatar.src = post.user.avatar;
      //     name.innerHTML = post.user.username;
      //     date.innerHTML = new Date(post.createdAt).toLocaleDateString();
      //     postTitle.innerHTML = post.title;
      //     postContent.innerHTML = post.content;
      //   }
      // });
    });
  });

  closeOpenPostModal();
};
