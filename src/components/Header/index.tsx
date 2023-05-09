import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header: React.FC = () => {
	const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
		locale: ptBR
	})
	return (
		<header className='px-6 py-12 h-[6.5rem] bg-white flex items-center border-b-gray-100'>
			<Link href='/'>
				<Image width={163} height={40} src='/Logo.png' alt='Logo' />
			</Link>
			<p className='text-gray-400 text-sm ml-8 py-1 pr-0 pl-8 border-l border-l-gray-200'>
				O melhor pra você ouvir, sempre
			</p>
			<span className='text-gray-400 text-sm capitalize ml-auto'>
				{currentDate}
			</span>
		</header>
	)
}
