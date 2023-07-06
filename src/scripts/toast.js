export const toastLongMessage = (message, color) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      borderRadius: "5px",
      padding: "15px 20px",
      width: "390px",
      height: "95px",
      border: "1px solid transparent",
      boxShadow: "0 0 5px 1px #343a40",
    },
  }).showToast();
};

export const toastShortMessage = (message, color) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      borderRadius: "5px",
      width: "280px",
      height: "50px",
      border: "1px solid transparent",
      boxShadow: "0 0 5px 1px #343a40",
    },
  }).showToast();
};

export const toastEmptyInput = (message, color) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      borderRadius: "5px",
      width: "250px",
      height: "70px",
      border: "1px solid transparent",
      boxShadow: "0 0 5px 1px #343a40",
    },
  }).showToast();
};
