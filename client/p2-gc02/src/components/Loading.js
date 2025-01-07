import Swal from "sweetalert2";

export default function showLoading() {
  Swal.fire({
    title: 'Loading...',
    text: 'Please wait',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
}
