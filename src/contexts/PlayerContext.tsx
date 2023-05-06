import React, { ReactNode, useContext, useState } from 'react'
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
	isLooping: boolean
	isShuffling: boolean
	play: (episode: EpisodeContext) => void
	playList: (list: Array<EpisodeContext>, index: number) => void
	togglePlay: () => void
	toggleLoop: () => void
	toggleShuffle: () => void
	setPlayingState: (state: boolean) => void
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
	const [isLooping, setIsLooping] = useState(false)
	const [isShuffling, setIsShuffling] = useState(false)

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
		console.log('playlist episodio ', list[index])
	}

	function togglePlay() {
		setIsPlaying((isPlaying) => !isPlaying)
	}

	function toggleLoop() {
		setIsLooping((isLooping) => !isLooping)
	}

	function toggleShuffle() {
		setIsShuffling((isShuffling) => !isShuffling)
	}

	function setPlayingState(state: boolean) {
		setIsPlaying(state)
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
				isLooping,
				isShuffling,
				togglePlay,
				toggleLoop,
				toggleShuffle,
				setPlayingState,
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

export const usePlayer = () => {
	return useContext(PlayerContext)
}
