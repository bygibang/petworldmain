import { useState } from "react";
import ButtonMain from "../../ui/buttonMain/ButtonMain"
import TextFieldBasic from "../../ui/fields/textFieldBasic/TextFieldBasic"
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { forgotPass } from "../../../utils/validationForms";
import MotionFrame from "../../ui/motionFrame/MotionFrame";


const ForgotPassword = ({ handleForgotPassword }) => {
	const { control, handleSubmit, formState: { errors, isValid } } = useForm({
		mode: "onBlur",
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(forgotPass)
	})

	return (
		<MotionFrame key={handleForgotPassword} lineY={15} className='mt-24 mb-48 flex items-center justify-center max-w-screen-2xl m-auto max-md:px-5'>
			<div className='mt-24 mb-48 flex items-center justify-center max-w-screen-2xl m-auto max-md:px-5'>
				<div className='w-1/3 max-1xl:w-1/2 max-lg:w-2/3 max-md:w-full py-12 px-10 flex flex-col items-center border border-border rounded-3xl shadow-xl'>
					<div className='w-full flex flex-col items-center gap-2 mb-10'>
						<h1 className='font-medium text-3xl'>Забули пароль?</h1>
						<p className='font-normal text-xl text-center'>Не хвилюйтесь, ми відправимо посилання на відновлення паролю на пошту</p>
					</div>
					<form onSubmit={handleSubmit((data, e) => handleForgotPassword(data.email, e))} className='w-full flex flex-col gap-10 text-center'>
						<Controller control={control} name='email' render={({ field }) =>
							<div>
								<TextFieldBasic
									{...field}
									label="Електронна пошта"
									name="email"
									placeholder="Введiть вашу пошту"
									type="email"
								/>
								{errors?.email && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.email.message}</p>}
							</div>
						} />
						<ButtonMain
							title="Надіслати посилання"
							type="submit"
							disabled={!isValid}
						/>
					</form>
				</div>
			</div>
		</MotionFrame>
	)
}

export default ForgotPassword