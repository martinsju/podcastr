import React from 'react'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

export const Header: React.FC = () => {
	const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
		locale: ptBR
	})
	return (
		<header className='px-6 py-12 h-[6.5rem] bg-white flex items-center border-b-gray-100'>
			<h3 className='text-gray-800'>Podcastr</h3>
			<p className='text-gray-400 text-xs ml-2 px-1 border-l border-l-gray-100'>
				O melhor pra você ouvir, sempre
			</p>
			<span className='text-gray-400 text-xs capitalize ml-auto'>
				{currentDate}
			</span>
		</header>
	)
}
