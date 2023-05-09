import { usePlayer } from '@/contexts/PlayerContext'
import Image from 'next/image'

interface PlayerButtonProps {
	alt: string
	playButton?: boolean
	src: string
	shouldBeDisabled?: boolean
	handleClick?: () => void
}

function PlayerButton({
	alt,
	playButton,
	src,
	shouldBeDisabled,
	handleClick
}: PlayerButtonProps) {
	const [{ episodeList, currentEpisodeIndex }] = usePlayer()
	const episode = episodeList[currentEpisodeIndex]

	return (
		<button
			type='button'
			onClick={handleClick}
			disabled={!episode || shouldBeDisabled}
			className={` border-0 text-[0] transition duration-200 hover:brightness-90 disabled:brightness-100 disabled:opacity-50 ${
				playButton
					? 'w-16 h-16 flex justify-center items-center rounded-2xl bg-blue-400 hover:brightness-95'
					: 'bg-transparent'
			}`}
		>
			<Image width={20} height={20} src={src} alt={alt} />
		</button>
	)
}

export default PlayerButton
