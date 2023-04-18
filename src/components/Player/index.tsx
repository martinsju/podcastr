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

			<footer>
				<div id='progress' className=''>
					<span>00:00</span>
					<div id='emptySlider'></div>
					<span>00:00</span>
				</div>

				<div id='buttons'>
					<button type='button'>
						<Image width={20} height={20} src='/shuffle.svg' alt='Embaralhar' />
					</button>
					<button type='button'>
						<Image
							width={20}
							height={20}
							src='/play-previous.svg'
							alt='Tocar anterior'
						/>
					</button>
					<button type='button' id='playButton' className=''>
						<Image width={20} height={20} src='/play.svg' alt='Tocar' />
					</button>
					<button type='button'>
						<Image
							width={20}
							height={20}
							src='/play-next.svg'
							alt='Tocar próxima'
						/>
					</button>
					<button type='button'>
						<Image width={20} height={20} src='/repeat.svg' alt='Repetir' />
					</button>
				</div>
			</footer>
		</div>
	)
}
