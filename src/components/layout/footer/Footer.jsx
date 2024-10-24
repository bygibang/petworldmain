import { Link, NavLink } from "react-router-dom"
import Logo from "../../ui/logo/Logo"
import logoFooter from '../../../public/Logo/logoFooter.svg';
import textLogoFooter from '../../../public/Logo/logoTextFooter.svg'

const Footer = () => {
	return (
		<footer className="w-full  bg-footer-bg py-8">
			<nav className="flex flex-col items-center justify-center gap-12 max-2xl:px-5 max-w-screen-2xl m-auto max-md:items-start">
				<div className=" w-full flex items-center justify-between max-md:flex-col max-md:items-start gap-10">
					<Logo logo={logoFooter} textLogo={textLogoFooter}/>
					<div className="flex flex-col items-start gap-2 max-md:flex-row">
						<h1 className="text-white font-bold">Контакти</h1>
						<Link to={"mailto:mail@example.com"} className="text-footer-link underline">support@petworld.pet</Link>
					</div>
				</div>
				<div className="font-normal text-white/40 text-sm">Copyright 2024 | <NavLink to={"/"} className="text-footer-link underline">Політика конфіденційності</NavLink></div>
			</nav>
		</footer>
	)
}

export default Footer