import React from 'react'
import Image from 'next/image'

export const Player: React.FC = () => {
	return (
		<div className='py-12 px-16 w-[26.5rem] h-screen flex flex-col items-center justify-between bg-blue-500 text-white'>
			<header className='flex items-center gap-4'>
				<strong>Tocando agora</strong>
			</header>

			<div
				id='emptyPlayer'
				className='p-16 w-full h-80 flex items-center justify-center text-center border-[1.5px] border-dashed border-blue-300 rounded-3xl bg-gradient-143.8 from-blue-400 to-transparent'
			>
				<strong>Selecione um podcast para ouvir</strong>
			</div>

			<footer className='self-stretch opacity-50'>
				{/* aqui vou precisar fazer uma condicional para uma class empty no footer com opacity 0.5*/}
				<div id='progress' className='flex items-center gap-4 text-sm'>
					<span>00:00</span>
					<div id='slider' className='flex-1 '>
						<div
							id='emptySlider'
							className='w-full h-1 bg-blue-300 rounded-sm'
						></div>
					</div>
					<span>00:00</span>
				</div>

				<div
					id='buttons'
					className='flex items-center justify-center
				 mt-10 gap-6'
				>
					<button type='button' className='bg-transparent border-0 text-[0]'>
						<Image width={20} height={20} src='/shuffle.svg' alt='Embaralhar' />
					</button>
					<button type='button' className='bg-transparent border-0 text-[0]'>
						<Image
							width={20}
							height={20}
							src='/play-previous.svg'
							alt='Tocar anterior'
						/>
					</button>
					<button
						type='button'
						id='playButton'
						className='w-16 h-16 flex justify-center items-center border-0 rounded-2xl text-[0] bg-blue-400'
					>
						<Image width={20} height={20} src='/play.svg' alt='Tocar' />
					</button>
					<button type='button' className='bg-transparent border-0 text-[0]'>
						<Image
							width={20}
							height={20}
							src='/play-next.svg'
							alt='Tocar próxima'
						/>
					</button>
					<button type='button' className='bg-transparent border-0 text-[0]'>
						<Image width={20} height={20} src='/repeat.svg' alt='Repetir' />
					</button>
				</div>
			</footer>
		</div>
	)
}
