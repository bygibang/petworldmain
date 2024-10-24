import { Controller, useForm } from "react-hook-form";
import SelectLocation from "../../ui/fields/selectLocation/SelectLocation"
import TextFieldBasic from "../../ui/fields/textFieldBasic/TextFieldBasic"
import { formProfile } from "../../../utils/validationForms";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRef } from "react";
import MotionFrame from "../../ui/motionFrame/MotionFrame";


const EditProfile = ({ handleSaveClick, handleCancelClick, userData }) => {
	const formRef = useRef(null);
	const { control, handleSubmit, formState: { errors }, getValues } = useForm({
		mode: "onBlur",
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			phone_number: '',
			location: '',
		},
		resolver: yupResolver(formProfile)
	});
	const onSubmit = async (data) => {
		handleSaveClick(data);
	};
	const onCancel = async () => {
		const values = getValues(); // Get form values
		handleCancelClick(values);
	};

	return (
		<>
			<div className='w-full flex items-center justify-between border-b border-border pb-3 max-md:gap-2 '>
				<h1 className='font-semibold text-3xl'>{userData.name} {userData.surname}</h1>
				<MotionFrame key={userData} lineY={0}>
					<div className='flex items-center gap-10 max-md:flex-col-reverse max-md:gap-2 max-md:items-end text-right'>
						<button className='underline text-primary-100' onClick={onCancel} >Отмена</button>
						<button className='underline text-primary-100 text-right' type="submit" form="edit-profile-form">Зберегти редагування</button>
					</div>
				</MotionFrame>
			</div>
			<form ref={formRef} id="edit-profile-form" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8 items-start mt-10 mb-20">
				<div className="w-1/2 max-xl:w-2/3 flex gap-5 max-lg:w-full max-extramd:flex-col">
					<Controller control={control} name='name' render={({ field }) =>
						<div className="w-full">
							<TextFieldBasic
								{...field}
								label="Iм'я"
								placeholder="Введiть ім'я"
								name="name"
							/>
							{errors.name && <p className='p-2 font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.name.message}</p>}
						</div>
					} />
					<Controller control={control} name='surname' render={({ field }) =>
						<div className="w-full">
							<TextFieldBasic
								{...field}
								label="Прiзвище"
								placeholder="Введiть прiзвище"
								name="surname"
							/>
							{errors?.surname && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.surname.message}</p>}
						</div>
					} />
				</div>
				<div className="w-1/2 max-xl:w-2/3 flex gap-5 max-lg:w-full max-extramd:flex-col">
					<Controller control={control} name='email' render={({ field }) =>
						<div className="w-full">
							<TextFieldBasic
								{...field}
								label="Електронна пошта"
								placeholder="Введiть вашу пошту"
								name="email"
							/>
							{errors?.email && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.email.message}</p>}
						</div>
					} />
					<Controller control={control} name='location' render={({ field }) =>
						<div className="w-full">
							<SelectLocation
								{...field}
								name="location"
							/>
							{errors?.location && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.location.message}</p>}
						</div>
					} />
				</div>
				<div className="w-1/4 max-xl:w-2/3 flex gap-5 max-lg:w-full max-extramd:flex-col">
					<Controller control={control} name='phone_number' render={({ field }) =>
						<div className="w-full">
							<TextFieldBasic
								{...field}
								label="Телефон"
								placeholder="Введiть ваш номер телефону"
								name="phone_number"
							/>
							{errors?.phone_number && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.phone_number.message}</p>}
						</div>
					} />
				</div>
			</form>

		</>
	);
};

export default EditProfile