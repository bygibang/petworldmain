import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthorizationPage from "./pages/AuthorizationPage"
import ProfilePage from "./pages/ProfilePage"
import AnimalPage from "./pages/AnimalPage"
import RegistrationPage from "./pages/RegistrationPage"
import { useSelector } from "react-redux"
import AnnouncementCreatePage from "./pages/AnnouncementCreatePage"
import CatalogPage from "./pages/CatalogPage"
import PageNotFound from "./pages/PageNotFound"
import MotionFrame from "./components/ui/motionFrame/MotionFrame"

function App() {
	const isUser = useSelector(store => store.user.user.isUser)
	const location = useLocation();

	const RequireAuth = ({ children }) => {
		return isUser ? children : <Navigate to="/authorization" />
	}

	const CheckIsUser = ({ children }) => {
		return !isUser ? children : <Navigate to="/" />
	}

	return (
		<Routes>
			<Route path="/" element={
				<MotionFrame key={location.pathname} lineY={15}>
					<HomePage />
				</MotionFrame>}
			/>
			<Route path="/authorization" element={
				<CheckIsUser>
					<MotionFrame key={location.pathname} lineY={15}>
						<AuthorizationPage />
					</MotionFrame>
				</CheckIsUser>
			} />
			<Route path="/registration" element={
				<CheckIsUser>
					<MotionFrame key={location.pathname} lineY={15}>
						<RegistrationPage />
					</MotionFrame>
				</CheckIsUser>
			} />
			<Route path="/profile" element={
				<RequireAuth>
					<MotionFrame key={location.pathname} lineY={15}>
						<ProfilePage />
					</MotionFrame>
				</RequireAuth>
			} />
			<Route path="/creatingAnAnnouncement" element={
				<RequireAuth>
					<MotionFrame key={location.pathname} lineY={15}>
						<AnnouncementCreatePage />
					</MotionFrame>
				</RequireAuth>
			} />
			<Route path="/announcement/:id" element={
				<MotionFrame key={location.pathname} lineY={15}>
					<AnimalPage />
				</MotionFrame>}
			/>
			<Route path="/catalog" element={
				<MotionFrame key={location.pathname} lineY={15}>
					<CatalogPage />
				</MotionFrame>}
			/>
			<Route path="*" element={
				<MotionFrame key={location.pathname} lineY={15}>
					<PageNotFound />
				</MotionFrame>}
			/>
		</Routes>
	)
}

export default App
