import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<Layout>
				<App />
			</Layout>
		</Provider>
	</BrowserRouter>
)
