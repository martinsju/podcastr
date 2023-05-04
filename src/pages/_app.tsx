import type { AppProps } from 'next/app'
import '../styles/global.css'
import { Header } from '@/components/Header'
import { Player } from '@/components/Player'
import { PlayerContext } from '@/contexts/PlayerContext'
import { useState } from 'react'

type EpisodeApp = {
	title: string
	members: string
	thumbnail: string
	duration: number
	url: string
}

export default function App({ Component, pageProps }: AppProps) {
	const [episodeList, setEpisodeList] = useState<Array<EpisodeApp>>([])
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

	function play(episode: EpisodeApp) {
		setEpisodeList([episode])
		setCurrentEpisodeIndex(0)
		console.log('clicou no episodio ', episode.title)
	}
	//passa função play pelo context tambem

	return (
		<PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
			<div className='flex'>
				<main className='flex-1'>
					<Header />
					<Component {...pageProps} />
				</main>
				<Player />
			</div>
		</PlayerContext.Provider>
	)
}
