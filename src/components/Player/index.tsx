import React from 'react'

export const Player: React.FC = () => {
	return (
		<div className='px-12 py-16 w-96 h-screen flex flex-col items-center justify-between bg-blue-500 text-white'>
			<header className='flex items-center gap-4'>
				<strong>Tocando agora</strong>
			</header>

			<div id='emptyPlayer' className=''>
				<strong>Selecione um podcast para ouvir</strong>
			</div>

			<footer></footer>
		</div>
	)
}
