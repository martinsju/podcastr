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
	const [isPlaying, setIsPlaying] = useState(true)

	function play(episode: EpisodeApp) {
		setEpisodeList([episode])
		setCurrentEpisodeIndex(0)
		setIsPlaying(true)
		console.log('clicou no episodio ', episode.title)
	}

	function togglePlay() {
		setIsPlaying((isPlaying) => !isPlaying)
	}

	return (
		<PlayerContext.Provider
			value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay }}
		>
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
