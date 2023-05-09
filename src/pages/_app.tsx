import { Header } from '@/components/Header'
import { Player } from '@/components/Player'
import { PlayerContextProvider } from '@/contexts/PlayerContext'
import type { AppProps } from 'next/app'
import '../styles/global.css'

const App = ({ Component, pageProps }: AppProps) => {
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

export default App
