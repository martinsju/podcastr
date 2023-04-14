import type { AppProps } from 'next/app'
import '../styles/global.css'
import { Header } from '@/components/Header'
import { Player } from '@/components/Player'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className='flex flex-1'>
			<main>
				<Header />
				<Component {...pageProps} />
			</main>
			<Player />
		</div>
	)
}
