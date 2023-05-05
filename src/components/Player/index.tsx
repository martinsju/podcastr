import React, { useContext, useEffect, useRef } from 'react'
import Image from 'next/image'

import { usePlayer } from '@/contexts/PlayerContext'
import PlayerButton from '../PlayerButton'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export const Player: React.FC = () => {
	const audioRef = useRef<HTMLAudioElement>(null)

	const {
		episodeList,
		currentEpisodeIndex,
		isPlaying,
		isLooping,
		togglePlay,
		setPlayingState,
		playNext,
		playPrevious,
		hasNext,
		hasPrevious
	} = usePlayer()

	useEffect(() => {
		if (!audioRef.current) {
			return
		}

		if (isPlaying) {
			audioRef.current.play()
			console.log('playing: ', isPlaying)
		} else {
			audioRef.current.pause()
			console.log('playing: ', isPlaying)
		}
	}, [isPlaying])

	const episode = episodeList[currentEpisodeIndex]

	const playOrPauseIcon = isPlaying ? '/pause.svg' : '/play.svg'

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
					<span>00:00</span>
					<div id='slider' className='flex-1 '>
						{episode ? (
							<Slider
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
					<span>00:00</span>
				</div>

				{episode && (
					<audio
						src={episode.url}
						ref={audioRef}
						loop={isLooping}
						autoPlay
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
					/>
				)}

				<div
					id='buttons'
					className='flex items-center justify-center
				 mt-10 gap-6'
				>
					<PlayerButton src='/shuffle.svg' alt='Embaralhar' />
					<PlayerButton
						src='/play-previous.svg'
						alt='Tocar anterior'
						handleClick={playPrevious}
						shouldBeDisabled={!hasPrevious}
					/>
					<PlayerButton
						src={playOrPauseIcon}
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
					<PlayerButton src='/repeat.svg' alt='Repetir' />
				</div>
			</footer>
		</div>
	)
}
