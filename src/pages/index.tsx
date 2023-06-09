import { api } from '@/components/services/api'
import { usePlayer } from '@/contexts/PlayerContext'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import React from 'react'

interface EpisodeHome {
	id: string
	title: string
	members: string
	publishedAt: string
	thumbnail: string
	url: string
	duration: number
	durationAsString: string
}

interface HomeProps {
	latestEpisodes: Array<EpisodeHome>
	allEpisodes: Array<EpisodeHome>
}

interface EpisodeData {
	id: string
	title: string
	members: string
	published_at: string
	thumbnail: string
	file: FileData
}

interface FileData {
	url: string
	duration: number
}

const Home: React.FC<HomeProps> = ({ latestEpisodes, allEpisodes }) => {
	const [, { playList }] = usePlayer()

	const episodeList = [...latestEpisodes, ...allEpisodes]

	return (
		<div
			id='homePage'
			className='py-0 px-16 h-[calc(100vh-6.5rem)] overflow-y-scroll '
		>
			<Head>
				<title>Home | Podcastr</title>
			</Head>
			<section id='latestEpisodes'>
				<h2 className='mt-12 mb-6'>Últimos lançamentos</h2>
				<ul className='list-none grid grid-cols-2 gap-6'>
					{latestEpisodes.map((episode, index) => {
						return (
							<li
								key={episode.id}
								className='bg-white border border-gray-100 p-5 rounded-3xl relative flex items-center'
							>
								<Image
									width={192}
									height={192}
									src={episode.thumbnail}
									alt={episode.title}
									className='w-24 h-24 rounded-2xl'
									style={{ objectFit: 'cover' }}
								/>

								<div
									id='episodeDetails'
									className='flex-1 overflow-hidden ml-4'
								>
									<Link
										href={`/episodes/${episode.id}`}
										className='block text-gray-800 leading-[1.4rem] font-semibold no-underline hover:underline '
									>
										{episode.title}
									</Link>
									<p className='text-sm mt-2 max-w-[70%] whitespace-nowrap overflow-hidden text-ellipsis'>
										{episode.members}
									</p>
									<span className='inline-block mt-2 text-sm'>
										{episode.publishedAt}
									</span>
									<span className='inline-block mt-2 text-sm ml-2 pl-2 relative before:content-[""] before:w-1 before:h-1 before:rounded-sm before:bg-[#DDD] before:absolute before:left-0 before:top-1/2 before:translate-x-[-50%] before:translate-y-[-50%]'>
										{episode.durationAsString}
									</span>
								</div>

								<button
									type='button'
									onClick={() => playList(episodeList, index)}
									className='absolute right-8 bottom-8 w-10 h-10 bg-white border border-gray-100 rounded-[0.675rem] text-[0] transition duration-200 hover:brightness-95'
								>
									<Image
										width={120}
										height={120}
										src='/play-green.svg'
										alt='Tocar episódio'
										className='w-6 h-6 m-auto'
									/>
								</button>
							</li>
						)
					})}
				</ul>
			</section>

			<section id='allEpisodes' className='pb-8'>
				<h2>Todos os episódios</h2>

				<table cellSpacing={0} className='w-full'>
					<thead>
						<tr>
							<th className='py-3 px-4 border-b border-gray-100 text-gray-300 uppercase text-xs font-medium font-secondary text-left '></th>
							<th className='py-3 px-4 border-b border-gray-100 text-gray-300 uppercase text-xs font-medium font-secondary text-left '>
								Podcast
							</th>
							<th className='py-3 px-4 border-b border-gray-100 text-gray-300 uppercase text-xs font-medium font-secondary text-left '>
								Integrantes
							</th>
							<th className='py-3 px-4 border-b border-gray-100 text-gray-300 uppercase text-xs font-medium font-secondary text-left '>
								Data
							</th>
							<th className='py-3 px-4 border-b border-gray-100 text-gray-300 uppercase text-xs font-medium font-secondary text-left '>
								Duração
							</th>
							<th className='py-3 px-4 border-b border-gray-100 text-gray-300 uppercase text-xs font-medium font-secondary text-left '></th>
						</tr>
					</thead>
					<tbody>
						{allEpisodes.map((episode, index) => {
							return (
								<tr key={episode.id}>
									<td className='py-3 px-4 border-b border-gray-100 text-sm w-[72px]'>
										<Image
											width={120}
											height={120}
											src={episode.thumbnail}
											alt={episode.title}
											className='w-10 h-10 rounded-lg'
											style={{ objectFit: 'cover' }}
										/>
									</td>
									<td className='py-3 px-4 border-b border-gray-100 text-sm'>
										<Link
											href={`/episodes/${episode.id}`}
											className='text-base text-gray-800 font-[Lexend] font-semibold no-underline leading-[1.4rem] hover:underline'
										>
											{episode.title}
										</Link>
									</td>
									<td className='py-3 px-4 border-b border-gray-100 text-sm'>
										{episode.members}
									</td>
									<td className='py-3 px-4 border-b border-gray-100 text-sm w-[100px]'>
										{episode.publishedAt}
									</td>
									<td className='py-3 px-4 border-b border-gray-100 text-sm'>
										{episode.durationAsString}
									</td>
									<td className='py-3 px-4 border-b border-gray-100 text-sm'>
										<button
											type='button'
											onClick={() => playList(episodeList, index + 2)}
											className='w-8 h-8 bg-white border border-gray-100 rounded-lg text-[0] transition duration-200 hover:brightness-95'
										>
											<Image
												width={120}
												height={120}
												src='/play-green.svg'
												alt='Tocar episódio'
												className='w-5 h-5 rounded-lg m-auto'
											/>
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</section>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await api.get('episodes', {
		params: {
			_limit: 12,
			_sort: 'published_at',
			_order: 'desc'
		}
	})

	const episodes = data.map((episode: EpisodeData) => {
		return {
			id: episode.id,
			title: episode.title,
			members: episode.members,
			publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
				locale: ptBR
			}),
			thumbnail: episode.thumbnail,
			url: episode.file.url,
			duration: Number(episode.file.duration),
			durationAsString: convertDurationToTimeString(
				Number(episode.file.duration)
			)
		}
	})

	const latestEpisodes = episodes.slice(0, 2)
	const allEpisodes = episodes.slice(2, episodes.length)

	return {
		props: {
			latestEpisodes,
			allEpisodes
		},
		revalidate: 60 * 60 * 8 //a cada 8h
	}
}

export default Home
