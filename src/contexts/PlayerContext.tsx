import React, { ReactNode, useState } from 'react'
import { createContext } from 'react'

type EpisodeContext = {
	title: string
	members: string
	thumbnail: string
	duration: number
	url: string
}

type PlayerContextData = {
	episodeList: Array<EpisodeContext>
	currentEpisodeIndex: number
	//currentEpisode is an array position
	isPlaying: boolean
	play: (episode: EpisodeContext) => void
	playList: (list: Array<EpisodeContext>, index: number) => void
	togglePlay: () => void
	playNext: () => void
	playPrevious: () => void
	hasNext: boolean
	hasPrevious: boolean
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
	children: ReactNode
}

export const PlayerContextProvider = ({
	children
}: PlayerContextProviderProps) => {
	const [episodeList, setEpisodeList] = useState<Array<EpisodeContext>>([])
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(true)

	const hasNext = currentEpisodeIndex + 1 < episodeList.length
	const hasPrevious = currentEpisodeIndex > 0

	function play(episode: EpisodeContext) {
		setEpisodeList([episode])
		setCurrentEpisodeIndex(0)
		setIsPlaying(true)
		// console.log('clicou no episodio ', episode.title)
	}

	function playList(list: Array<EpisodeContext>, index: number) {
		setEpisodeList(list)
		setCurrentEpisodeIndex(index)
		setIsPlaying(true)
		// console.log('playlist episodio ', list[index])
	}

	function togglePlay() {
		setIsPlaying((isPlaying) => !isPlaying)
	}

	function playNext() {
		if (hasNext) {
			setCurrentEpisodeIndex(currentEpisodeIndex + 1)
		}
	}

	function playPrevious() {
		if (hasPrevious) {
			setCurrentEpisodeIndex(currentEpisodeIndex - 1)
		}
	}

	return (
		<PlayerContext.Provider
			value={{
				episodeList,
				currentEpisodeIndex,
				play,
				playList,
				isPlaying,
				togglePlay,
				playNext,
				playPrevious,
				hasNext,
				hasPrevious
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}
