import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { usePlayer } from '@/contexts/PlayerContext'
import PlayerButton from '../PlayerButton'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'

export const Player: React.FC = () => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [progress, setProgress] = useState(0)

	const {
		episodeList,
		currentEpisodeIndex,
		isPlaying,
		isLooping,
		isShuffling,
		togglePlay,
		toggleLoop,
		toggleShuffle,
		setPlayingState,
		playNext,
		playPrevious,
		clearPlayerState,
		hasNext,
		hasPrevious
	} = usePlayer()

	useEffect(() => {
		if (!audioRef.current) {
			return
		}

		if (isPlaying) {
			audioRef.current.play()
		} else {
			audioRef.current.pause()
		}
	}, [isPlaying])

	function setupProgressListener() {
		if (audioRef && audioRef.current) {
			audioRef.current.currentTime = 0
			audioRef.current.addEventListener('timeupdate', () => {
				setProgress(Math.floor(audioRef.current?.currentTime ?? 0))
			})
		}
	}

	function handleSliderBar(amount: number | number[]) {
		if (audioRef && audioRef.current && typeof amount === 'number') {
			audioRef.current.currentTime = amount
			setProgress(amount)
		}
	}

	function handleEpisodeEnded() {
		if (hasNext) {
			playNext()
		} else {
			clearPlayerState()
		}
	}

	const episode = episodeList[currentEpisodeIndex]

	const PLAY_OR_PAUSE_ICON = isPlaying ? '/pause.svg' : '/play.svg'
	const REPEAT_ICON = isLooping ? '/repeat-green.svg' : '/repeat.svg'
	const SHUFFLE_ICON = isShuffling ? '/shuffle-green.svg' : '/shuffle.svg'

	return (
		<div className='py-12 px-16 w-[26.5rem] h-screen flex flex-col items-center justify-between bg-blue-500 text-white'>
			<header className='flex items-center gap-4'>
				<strong>Tocando agora</strong>
			</header>
			{episode ? (
				<div id='currentEpisode' className='text-center '>
					<Image
						width={592}
						height={592}
						className='rounded-3xl w-full h-80 m-auto'
						src={episode.thumbnail}
						alt={episode.title}
						style={{ objectFit: 'cover' }}
					/>
					<strong className='block mt-8 font-semibold text-xl font-secondary leading-7'>
						{episode.title}
					</strong>
					<span className='block mt-4 opacity-60 leading-6'>
						{episode.members}
					</span>
				</div>
			) : (
				<div
					id='emptyPlayer'
					className='p-16 w-full h-80 flex items-center justify-center text-center border-[1.5px] border-dashed border-blue-300 rounded-3xl bg-gradient-143.8 from-blue-400 to-transparent'
				>
					<strong>Selecione um podcast para ouvir</strong>
				</div>
			)}

			<footer className='self-stretch'>
				<div
					id='progress'
					className={`flex items-center gap-4 text-sm ${
						!episode ? 'opacity-50' : ''
					}`}
				>
					<span>{convertDurationToTimeString(progress)}</span>
					<div id='slider' className='flex-1 '>
						{episode ? (
							<Slider
								min={0}
								max={episode.duration}
								value={progress}
								onChange={handleSliderBar}
								trackStyle={{ backgroundColor: '#04d361' }}
								railStyle={{ backgroundColor: '#60A5FA' }}
								handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
							/>
						) : (
							<div
								id='emptySlider'
								className='w-full h-1 bg-blue-300 rounded-sm'
							></div>
						)}
					</div>
					<span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
				</div>

				{episode && (
					<audio
						src={episode.url}
						ref={audioRef}
						loop={isLooping}
						autoPlay
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
						onEnded={handleEpisodeEnded}
						onLoadedMetadata={setupProgressListener}
					/>
				)}

				<div
					id='buttons'
					className='flex items-center justify-center
				 mt-10 gap-6'
				>
					<PlayerButton
						src={SHUFFLE_ICON}
						alt='Embaralhar'
						handleClick={toggleShuffle}
						shouldBeDisabled={episodeList.length === 1}
					/>
					<PlayerButton
						src='/play-previous.svg'
						alt='Tocar anterior'
						handleClick={playPrevious}
						shouldBeDisabled={!hasPrevious}
					/>
					<PlayerButton
						src={PLAY_OR_PAUSE_ICON}
						alt='Tocar'
						handleClick={togglePlay}
						playButton
					/>
					<PlayerButton
						src='/play-next.svg'
						alt='Tocar próxima'
						handleClick={playNext}
						shouldBeDisabled={!hasNext}
					/>
					<PlayerButton
						src={REPEAT_ICON}
						alt='Repetir'
						handleClick={toggleLoop}
					/>
				</div>
			</footer>
		</div>
	)
}
