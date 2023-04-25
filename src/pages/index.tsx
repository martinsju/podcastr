import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '@/components/services/api'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import Image from 'next/image'

type Episode = {
	id: string
	title: string
	thumbnail: string
	members: string
	publishedAt: string
	url: string
	durationAsString: string
	description: string
}

type HomeProps = {
	latestEpisodes: Array<Episode>
	allEpisodes: Array<Episode>
}

type EpisodeData = {
	id: string
	title: string
	thumbnail: string
	members: string
	published_at: string
	file: {
		duration: number
		url: string
	}
	description: string
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
	return (
		<div id='homePage' className=''>
			<section id='lastEpisodes'>
				<h2>Últimos lançamentos</h2>
				<ul>
					{latestEpisodes.map((episode) => {
						return (
							<li key={episode.id}>
								<Image
									width={192}
									height={192}
									src={episode.thumbnail}
									alt={episode.title}
									style={{ objectFit: 'cover' }}
								/>
								<div id='episodeDetails'>
									<a href=''>{episode.title}</a>
									<p>{episode.members}</p>
									<span>{episode.publishedAt}</span>
									<span>{episode.durationAsString}</span>
								</div>

								<button type='button'>
									<Image
										width={10}
										height={10}
										src='/play-green.svg'
										alt='Tocar episódio'
									/>
								</button>
							</li>
						)
					})}
				</ul>
			</section>

			<section id='allEpisodes'></section>
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

	//format data before rendering it
	const episodes = data.map((episode: EpisodeData) => {
		return {
			id: episode.id,
			title: episode.title,
			thumbnail: episode.thumbnail,
			members: episode.members,
			publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
				locale: ptBR
			}),
			duration: Number(episode.file.duration),
			durationAsString: convertDurationToTimeString(
				Number(episode.file.duration)
			),
			description: episode.description,
			url: episode.file.url
		}
	})

	const latestEpisodes: Episode = episodes.slice(0, 2)
	const allEpisodes: Episode = episodes.slice(2, episodes.length)

	return {
		props: {
			latestEpisodes,
			allEpisodes
		},
		revalidate: 60 * 60 * 8 //a cada 8h
	}
}
