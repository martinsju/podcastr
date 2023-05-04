import React from 'react'
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
}

export const PlayerContext = createContext({} as PlayerContextData)
