import Swal from "sweetalert2";

export const notificacion = {
  warn(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: "warning",
    });
  },
};
