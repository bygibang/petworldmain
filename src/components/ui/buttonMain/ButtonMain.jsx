import { forwardRef } from "react"


const ButtonMain = forwardRef(({ title, icon, onClick, type, disabled,variant = 'primary' }, ref) => {
	const buttonStyles = {
		 secondary:'w-full max-w-60 flex items-center justify-center py-2.5 px-6 bg-white text-primary-100 font-medium rounded-full border border-primary-100 gap-2.5 hover:scale-105 transition-transform duration-200 disabled:bg-text_grey-200/70',
		 primary: 'w-full flex items-center justify-center py-2.5 px-6 bg-primary-100 text-white font-medium rounded-full gap-2.5 hover:scale-105 transition-transform duration-200 disabled:bg-text_grey-200/70',
	 };
	 const styleClass = buttonStyles[variant];
	return (
		 <button
			  ref={ref} // Pass the ref to the button element
			  onClick={onClick}
			  type={type}
			  disabled={disabled}
			  className={styleClass}>
			  {icon && <p className="w-6 h-6">{icon}</p>}
			  <p>{title}</p>
		 </button>
	);
});

export default ButtonMain