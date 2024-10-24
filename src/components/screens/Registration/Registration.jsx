import TextFiledBasic from '../../ui/fields/textFieldBasic/TextFieldBasic';
import ButtonMain from '../../ui/buttonMain/ButtonMain';
import { NavLink } from 'react-router-dom';
import SelectLocation from '../../ui/fields/selectLocation/SelectLocation';
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { formRegister } from '../../../utils/validationForms';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Registration = ({ handleRegister }) => {
	const { control, handleSubmit, formState: { errors, isValid } } = useForm({
		mode: "onBlur",
		defaultValues: {
			name: "",
			surname: "",
			phone_number: "",
			password: "",
			email: "",
			location: "",
		},
		resolver: yupResolver(formRegister)
	})

	return (
		<div className='mt-24 mb-48 flex items-center justify-center max-w-screen-2xl m-auto max-md:px-5'>
			<div className='w-1/3 max-1xl:w-1/2 max-lg:w-2/3 max-md:w-full py-12 px-10 flex flex-col items-center border border-border rounded-3xl shadow-xl'>
				<div className='w-full flex flex-col items-center gap-2 mb-10'>
					<h1 className='font-medium text-3xl'>Привіт!</h1>
					<p className='font-normal text-xl text-center'>Будь ласка введіть свої дані, щоб зареєструватися</p>
				</div>
				<div className='w-full flex flex-col gap-10 text-center'>
					<form onSubmit={handleSubmit(handleRegister)} className='w-full flex flex-col gap-10'>
						<div className='flex flex-col gap-5'>
							<Controller control={control} name='name' render={({ field }) =>
								<div>
									<TextFiledBasic
										{...field}
										label="Iм'я"
										placeholder="Введiть ім'я"
										name="name"
									/>
									{errors.name && <p className='p-2 font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.name.message}</p>}
								</div>
							} />
							<Controller control={control} name='surname' render={({ field }) =>
								<div>
									<TextFiledBasic
										{...field}
										label="Прiзвище"
										placeholder="Введiть прiзвище"
										name="surname"
									/>
									{errors?.surname && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.surname.message}</p>}
								</div>
							} />
							<Controller control={control} name='phone_number' render={({ field }) =>
								<div>
									<TextFiledBasic
										{...field}
										label="Телефон"
										placeholder="Введiть ваш номер телефону"
										name="phone_number"
									/>
									{errors?.phone_number && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.phone_number.message}</p>}
								</div>
							} />
							<Controller control={control} name='password' render={({ field }) =>
								<div>
									<TextFiledBasic
										{...field}
										label="Пароль"
										placeholder="Введiть пароль"
										name="password"
										type="password"
									/>
									{errors?.password && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.password.message}</p>}
								</div>
							} />
							<Controller control={control} name='email' render={({ field }) =>
								<div>
									<TextFiledBasic
										{...field}
										label="Електронна пошта"
										placeholder="Введiть вашу пошту"
										name="email"
									/>
									{errors?.email && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.email.message}</p>}
								</div>
							} />
							<Controller control={control} name='location' render={({ field }) =>
								<div>
									<SelectLocation
										{...field}
										name="location"
									/>
									{errors?.location && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{errors.location.message}</p>}
								</div>
							} />
						</div>
						<ButtonMain
							title="Зареэструватися"
							type="submit"
							disabled={!isValid}
						/>
					</form>
					<p>Вже маэте аккаунт? <NavLink to={"/authorization"} className="underline text-primary-100 font-medium">Вхiд</NavLink></p>
				</div>
			</div>
		</div>
	)
}

export default Registration