import type { AppProps } from 'next/app'
import { Header } from '@/components/Header'
import { Player } from '@/components/Player'
import '../styles/global.css'
import { PlayerContextProvider } from '@/contexts/PlayerContext'

type EpisodeApp = {
	title: string
	members: string
	thumbnail: string
	duration: number
	url: string
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PlayerContextProvider>
			<div className='flex'>
				<main className='flex-1'>
					<Header />
					<Component {...pageProps} />
				</main>
				<Player />
			</div>
		</PlayerContextProvider>
	)
}
