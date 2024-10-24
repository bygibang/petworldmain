import * as Yup from 'yup'

const passwordRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
const phoneNumberRegex = /^\+380\d{9}$/;
const nameSurnameRegex = /^[А-ЯA-Z][а-яa-z]+$/;


export const formRegister = Yup.object().shape({
	name:Yup.string().matches(nameSurnameRegex, "Ім’я не має містити цифр аба символів і має починатися з великої літери").required("Поле обов'язково!"),
	surname:Yup.string().matches(nameSurnameRegex,"Прiзвище не має містити цифр аба символів і має починатися з великої літери" ).required(),
	phone_number:Yup.string().matches(phoneNumberRegex, 'Введіть номер у форматі +380931234567').required("Поле обов'язково!"),
	password:Yup.string().matches(passwordRegex, "Має бути не менше 8 символів, так само містити число, спецсимвол, букву у верхньому регістрі!").required("Поле обов'язково!"),
	email:Yup.string().email("Вказана електронна пошта не існує. Перевірте правопис").required("Поле обов'язково!"),
	location:Yup.string().required("Поле обов'язково!"),
})


export const formAuth = Yup.object().shape({
	email:Yup.string().email("Вказана електронна пошта не існує. Перевірте правопис").required("Поле обов'язково!"),
	password:Yup.string().matches(passwordRegex, "Має бути не менше 8 символів, так само містити число, спецсимвол, букву у верхньому регістрі!").required("Поле обов'язково!"),
})

export const formProfile = Yup.object().shape({
	name: Yup.string().matches(nameSurnameRegex, "Ім’я не має містити цифр аба символів і має починатися з великої літери").required('Введіть ім\'я'),
	surname: Yup.string().matches(nameSurnameRegex,"Прiзвище не має містити цифр аба символів і має починатися з великої літери" ).required('Введіть прізвище'),
	email: Yup.string().email('Неправильний формат електронної пошти').required('Введіть електронну пошту'),
	phone_number: Yup.string().matches(phoneNumberRegex, 'Введіть номер у форматі +380931234567').required('Введіть номер телефону'),
	location: Yup.string().required('Введіть локацію'),
 });

 export const forgotPass = Yup.object().shape({
	email:Yup.string().email('Неправильний формат електронної пошти').required("Поле обов'язково!"),
})