import { toastLongMessage, toastShortMessage } from "./toast.js";

export const green = "#168821";
export const red = "#df1545";

export const createUser = async (requestBody) => {
  const toastDisplay = document.querySelector(".toast__container");
  const newUser = await fetch("http://localhost:3333/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        toastDisplay.classList.remove("hidden");
        setTimeout(() => {
          location.replace("../../");
          toastDisplay.classList.add("hidden");
        }, 4000);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toastLongMessage(err.message, red));

  return newUser;
};

export const loginRequest = async (loginBody) => {
  const toastDisplay = document.querySelector(".toast__container");
  const token = await fetch("http://localhost:3333/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody),
  })
    .then(async (response) => {
      const responseJson = await response.json();

      if (response.ok) {
        localStorage.setItem("@petInfo:token", responseJson.token);
        toastDisplay.classList.remove("hidden");
        setTimeout(() => {
          location.replace("./src/pages/dashboard.html");
          toastDisplay.classList.add("hidden");
        }, 3000);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toastShortMessage(err.message, red));

  return token;
};

export const getUserProfileInfos = async () => {
  const token = localStorage.getItem("@petInfo:token");
  const infos = await fetch("http://localhost:3333/users/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const responseJson = await response.json();

      if (response.ok) {
        localStorage.setItem("@petInfo:user", JSON.stringify(responseJson));
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => alert(err.message));

  return infos;
};

export const createPost = async (postBody) => {
  const token = localStorage.getItem("@petInfo:token");
  const newPost = await fetch("http://localhost:3333/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postBody),
  })
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        toastShortMessage("Post criado com sucesso", green);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toastShortMessage(err.message, red));

  return newPost;
};

export const getAllPosts = async () => {
  const token = localStorage.getItem("@petInfo:token");
  const allPosts = await fetch("http://localhost:3333/posts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Problemas no servidor, tente novamente mais tarde");
      }
    })
    .catch((err) => toastLongMessage(err.message, red));

  return allPosts;
};

export const updatePostById = async (postId, requestBody) => {
  const token = localStorage.getItem("@petInfo:token");
  const post = await fetch(`http://localhost:3333/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const responseJson = await response.json();

      if (response.ok) {
        toastShortMessage("Post atualizado com sucesso", green);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toastShortMessage(err.message, red));

  return post;
};

export const deletePostbyId = async (postId) => {
  const token = localStorage.getItem("@petInfo:token");
  const post = await fetch(`http://localhost:3333/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const responseJson = await response.json();

      if (response.ok) {
        toastShortMessage("Post deletado com sucesso", green);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toastShortMessage(err.message, red));

  return post;
};

// export async function getTaskById(postId) {
//   const token = localStorage.getItem("@petInfo:token");
//   const post = await fetch(`http://localhost:3333/posts${postId}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(async (response) => {
//       const responseJson = await response.json();

//       if (response.ok) {
//         return responseJson;
//       } else {
//         throw new Error(responseJson.message);
//       }
//     })
//     .catch((err) => toastShortMessage(err.message, red));

//   return post;
// }
