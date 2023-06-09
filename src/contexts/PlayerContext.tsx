import React, { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'

export interface EpisodeContext {
	title: string
	members: string
	thumbnail: string
	url: string
	duration: number
}

type PlayerContextData = [
	{
		episodeList: Array<EpisodeContext>
		currentEpisodeIndex: number
		isPlaying: boolean
		isLooping: boolean
		isShuffling: boolean
		hasNext: boolean
		hasPrevious: boolean
	},
	{
		play: (episode: EpisodeContext) => void
		playList: (list: Array<EpisodeContext>, index: number) => void
		togglePlay: () => void
		toggleLoop: () => void
		toggleShuffle: () => void
		setPlayingState: (state: boolean) => void
		playNext: () => void
		playPrevious: () => void
		clearPlayerState: () => void
	}
]

export const PlayerContext = createContext({} as PlayerContextData)

interface PlayerContextProviderProps {
	children: ReactNode
}

export const PlayerContextProvider = ({
	children
}: PlayerContextProviderProps) => {
	const [episodeList, setEpisodeList] = useState<Array<EpisodeContext>>([])
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLooping, setIsLooping] = useState(false)
	const [isShuffling, setIsShuffling] = useState(false)

	const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length
	const hasPrevious = currentEpisodeIndex > 0

	function play(episode: EpisodeContext) {
		setEpisodeList([episode])
		setCurrentEpisodeIndex(0)
		setIsPlaying(true)
	}

	function playList(list: Array<EpisodeContext>, index: number) {
		setEpisodeList(list)
		setCurrentEpisodeIndex(index)
		setIsPlaying(true)
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
		if (isShuffling) {
			const nextRandomEpisodeIndex = Math.floor(
				Math.random() * episodeList.length
			)
			setCurrentEpisodeIndex(nextRandomEpisodeIndex)
		} else if (hasNext) {
			setCurrentEpisodeIndex(currentEpisodeIndex + 1)
		}
	}

	function playPrevious() {
		if (hasPrevious) {
			setCurrentEpisodeIndex(currentEpisodeIndex - 1)
		}
	}

	function clearPlayerState() {
		setEpisodeList([])
		setCurrentEpisodeIndex(0)
	}

	return (
		<PlayerContext.Provider
			value={[
				{
					episodeList,
					currentEpisodeIndex,
					isPlaying,
					isLooping,
					isShuffling,
					hasNext,
					hasPrevious
				},
				{
					play,
					playList,
					togglePlay,
					toggleLoop,
					toggleShuffle,
					setPlayingState,
					playNext,
					playPrevious,
					clearPlayerState
				}
			]}
		>
			{children}
		</PlayerContext.Provider>
	)
}

export const usePlayer = () => {
	return useContext(PlayerContext)
}
