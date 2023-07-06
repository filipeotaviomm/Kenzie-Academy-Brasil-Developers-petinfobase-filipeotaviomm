import {
  handleExcludePostModal,
  handleModalEditPost,
  handleOpenPostModal,
} from "./modal.js";
import { getUserProfileInfos, getAllPosts } from "./requests.js";

export const renderHeader = () => {
  const infos = JSON.parse(localStorage.getItem("@petInfo:user"));
  const divHeaderContainer = document.querySelector(".headerContainer");
  const sectionLogout = document.querySelector(".toast__logout");

  divHeaderContainer.innerHTML = "";

  divHeaderContainer.insertAdjacentHTML(
    "beforeend",
    `
    <header class="tagHeader">
      <div class="header__container">
        <h2>Petinfo</h2>
        <div class="buttonImg__align">
          <button class="confirm__button">Criar publicação</button>
          <button class="photo__button">
            <img src=${infos.avatar} alt="" />
          </button>
        </div>
      </div>
    </header>
    <nav>
      <div class="nav__container">
        <h3>Feed</h3>
      </div>
    </nav>
  `
  );

  sectionLogout.innerHTML = "";

  sectionLogout.insertAdjacentHTML(
    "beforeend",
    `
    <p>@${infos.username}</p>
    <div class="toast__align">
      <button class="button__logout">
        <img src="../assets/logout.png" alt="" />
      </button> 
      <p>Logout</p>
    </div>
    `
  );
};

export const renderPosts = async () => {
  // const user = JSON.parse(localStorage.getItem("@petInfo:user"));
  const arrayProfile = await getUserProfileInfos();
  const arrayPosts = await getAllPosts();
  const arrayPostsReverse = arrayPosts.reverse();
  const ulPostContainer = document.querySelector(".postContainer");

  ulPostContainer.innerHTML = "";

  arrayPostsReverse.forEach((post) => {
    const create = createPost(arrayProfile, post);
    ulPostContainer.append(create);
  });

  console.log("render");
  handleModalEditPost();
  handleExcludePostModal();
  handleOpenPostModal();
};

const createPost = (profileInfo, posts) => {
  const liMainContainer = document.createElement("li");
  const divPostOwner = document.createElement("div");
  const divPostOwnerLeft = document.createElement("div");
  const imgAvatar = document.createElement("img");
  const pName = document.createElement("p");
  const spanSeparation = document.createElement("span");
  const pDate = document.createElement("p");
  const divPostOwnerRight = document.createElement("div");
  if (profileInfo.id === posts.user.id) {
    const buttonEdit = document.createElement("button");
    const buttonExclude = document.createElement("button");
    buttonEdit.innerHTML = "Editar";
    buttonEdit.classList.add("edit__button", "postOwner__buttons");
    buttonEdit.dataset.editId = posts.id;
    buttonExclude.innerHTML = "Excluir";
    buttonExclude.classList.add("exclude__button", "postOwner__buttons");
    divPostOwnerRight.classList.add("postOwner__right");
    divPostOwnerRight.append(buttonEdit, buttonExclude);
  }
  const divTitleContent = document.createElement("div");
  const h1TitlePost = document.createElement("h1");
  const pPostContent = document.createElement("p");
  const buttonAccessPost = document.createElement("button");
  buttonAccessPost.dataset.buttonId = posts.id;

  liMainContainer.classList.add("main__container");
  divPostOwner.classList.add("postOwner");
  divPostOwnerLeft.classList.add("postOwner__left");
  imgAvatar.src = posts.user.avatar;
  imgAvatar.alt = "Foto do perfil";
  pName.innerText = `@${posts.user.username}`;
  pName.id = "name";
  spanSeparation.innerText = "|";
  spanSeparation.id = "bar__separation";
  pDate.innerText = new Date(posts.createdAt).toLocaleDateString();
  pDate.id = "date";
  divTitleContent.classList.add("titleContent");
  h1TitlePost.innerHTML = posts.title;
  h1TitlePost.classList.add("post__title");

  if (posts.content.length > 150) {
    pPostContent.innerHTML = `${posts.content.substring(0, 150)}...`;
  } else {
    pPostContent.innerHTML = posts.content;
  }
  pPostContent.classList.add("post__content");
  buttonAccessPost.innerHTML = "Acessar publicação";
  buttonAccessPost.classList.add("accessPublic__button");

  divPostOwnerLeft.append(imgAvatar, pName, spanSeparation, pDate);
  divPostOwner.append(divPostOwnerLeft, divPostOwnerRight);
  divTitleContent.append(h1TitlePost, pPostContent, buttonAccessPost);
  liMainContainer.append(divPostOwner, divTitleContent);

  return liMainContainer;
};
