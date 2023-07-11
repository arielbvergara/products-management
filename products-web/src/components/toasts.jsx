import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export default function ToastSuccess(text) {

    return Toastify({
        text: text,
        duration: 10000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          borderRadius: "15px",
          background: "linear-gradient(to right, #60bf79, #6bff55)",
          color: "#ffffff"
        },
        onClick: function(){} // Callback after click
      });
}

export function ToastFail(text) {

  return Toastify({
      text: text,
      duration: 10000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        borderRadius: "15px",
        background: "linear-gradient(to right, #ff5555, #ab2020)",
        color: "#ffffff"
      },
      onClick: function(){} // Callback after click
    });
}