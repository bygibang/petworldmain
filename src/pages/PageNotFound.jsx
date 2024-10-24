import { useNavigate } from 'react-router-dom'
import ButtonMain from '../components/ui/buttonMain/ButtonMain'
import error404 from '../public/PageNotFound/error404.png'


const PageNotFound = () => {
	const router = useNavigate()
	return (
		<section className='relative w-full h-full max-w-screen-3xl m-auto'>
			<div className='w-full flex flex-col gap-44'>
				<div className='w-1/2 py-72 pl-20 max-xl:w-full max-xl:py-44 max-xl:px-20 flex flex-col gap-5'>
					<h1 className='max-w-3xl text-black font-bold text-5xl max-xl:text-3xl'>Упс!<br /> Схоже, ми не можемо знайти цю сторінку.</h1>
					<p className='font-medium text-lg my-4'>Ця сторінка вирішила піти гуляти без повідка і загубилась. Але не хвилюйтесь, ми завжди тут, щоб допомогти вам знайти свого нового улюбленця.</p>
					<div className='w-full max-w-60'>
						<ButtonMain title="Перейти на головну" onClick={() => router("/")} />
					</div>
				</div>
			</div>
			<img src={error404} alt="Страница не найдена" className='absolute right-0 top-0 max-xl:-z-10 max-xl:opacity-40 max-xl:blur-sm max-xl:h-full max-xl:w-full max-xl:object-cover' />
		</section>

	)
}

export default PageNotFound