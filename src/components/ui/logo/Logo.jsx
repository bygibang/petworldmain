import { NavLink } from 'react-router-dom';


const Logo = ({logo,textLogo, colorLogo}) => {
 return (
	<NavLink to={"/"} className='flex items-center gap-2.5'>
		<img src={logo} alt="логотип" className={colorLogo}/>
		<img src={textLogo} alt="логотип" />
	</NavLink>
 )
}

export default Logo