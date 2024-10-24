import TextFiled from '../../ui/fields/textFieldBasic/TextFieldBasic';
import ButtonMain from '../../ui/buttonMain/ButtonMain';
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formAuth } from '../../../utils/validationForms';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const Authorization = ({ handleSubmitAuth, setOpenForgotPass }) => {
	const { control, handleSubmit, formState: { errors, isValid } } = useForm({
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: ""
		},
		resolver: yupResolver(formAuth)
	})

	return (
		<div className='mt-24 mb-48 flex items-center justify-center max-w-screen-2xl m-auto max-md:px-5'>
			<div className='w-1/3 max-1xl:w-1/2 max-lg:w-2/3 max-md:w-full py-12 px-10 flex flex-col items-center border border-border rounded-3xl shadow-xl'>
				<div className='w-full flex flex-col items-center gap-2 mb-10'>
					<h1 className='font-medium text-3xl'>Привiт знову!</h1>
					<p className='font-normal text-xl max-md:text-center'>Будь ласка, введiть свої данi, щоб увiйти</p>
				</div>
				<div className='w-full flex flex-col gap-10 text-center'>
					<form onSubmit={handleSubmit(handleSubmitAuth)} className='w-full flex flex-col gap-10'>
						<div className='flex flex-col gap-8'>
							<Controller control={control} name='email' render={({ field }) =>
								<div>
									<TextFiled
										{...field}
										label="Електронна пошта"
										name="email"
										placeholder="Введiть вашу пошту"
										type="email"
									/>
									{errors?.email && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.email.message}</p>}
								</div>
							} />
							<Controller control={control} name='password' render={({ field }) =>
								<div>
									<TextFiled
										{...field}
										label="Пароль"
										name="password"
										placeholder="Введiть ваш пароль"
										type="password"
									/>
									{errors?.password && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.password.message}</p>}
								</div>
							} />
						</div>
						<ButtonMain title="Увiйти" type="submit" disabled={!isValid} />
					</form>
					<div>
						<button className='underline text-primary-100 font-medium' onClick={() => setOpenForgotPass(true)}>Забули пароль?</button>
					</div>
					<p>Ще не маэте аккаунту? <NavLink to={"/registration"} className="underline text-primary-100 font-medium">Зареэструватися</NavLink></p>
				</div>
			</div>
		</div>
	)
}

export default Authorization