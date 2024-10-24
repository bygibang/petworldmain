import Swal from "sweetalert2";

export const popupAlert = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
	 showCloseButton:false,
	 showConfirmButton:false,
    timer: 2500,
  });
};


export const PopupAlertShowError = () => {
	Swal.fire({
		title: 'Упс...',
		icon: "question",
		position: "top-end",
		text: 'Будь ласка, підтвердіть Вашу пошту, щоб мати можливість заходити під новим емейлом',
		confirmButtonText: "Добрэ",
		confirmButtonColor: "#5A00D6",
	})
}