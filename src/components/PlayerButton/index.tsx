import { PlayerContext } from '@/contexts/PlayerContext'
import React, { useContext } from 'react'
import Image from 'next/image'

type PlayerButtonProps = {
	src: string
	alt: string
	playButton?: boolean
	togglePlay?: () => void
}

function PlayerButton({ src, alt, playButton, togglePlay }: PlayerButtonProps) {
	const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)
	const episode = episodeList[currentEpisodeIndex]

	return (
		<button
			type='button'
			disabled={!episode}
			onClick={togglePlay}
			className={` border-0 text-[0] transition duration-200 hover:brightness-90 disabled:brightness-100 ${
				playButton
					? 'w-16 h-16 flex justify-center items-center rounded-2xl bg-blue-400 hover:brightness-95'
					: 'bg-transparent'
			} `}
		>
			<Image width={20} height={20} src={src} alt={alt} />
		</button>
	)
}

export default PlayerButton
