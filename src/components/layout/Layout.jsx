import Footer from "./footer/Footer"
import Header from "./header/Header"
import MobileHeader from "./header/MobileHeader"

const Layout = ({ children }) => {
	return (
		<div className="min-h-full flex flex-col">
			<Header />
			<MobileHeader />
			<main className="bg-background min-h-screen flex flex-col">
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default Layout