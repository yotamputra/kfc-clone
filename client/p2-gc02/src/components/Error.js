import Swal from "sweetalert2";
import "animate.css";

export function showErrorAlert(err) {
  Swal.fire({
    icon: "error",
    title: "Oops!",
    text: `${err.response.data.message || "Something went wrong!"}`,
    confirmButtonColor: "#d92027",
    background: "#ffffff",
    color: "#333333",
    confirmButtonText: "Try Again",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}
