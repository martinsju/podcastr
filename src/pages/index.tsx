import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '@/components/services/api'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'

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
	episodes: Array<Episode>
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

export default function Home(props: HomeProps) {
	return (
		<div className='container'>
			<h1>Index</h1>
			<p>Podcast: {JSON.stringify(props.episodes[0].title)}</p>
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

	return {
		props: {
			episodes
		},
		revalidate: 60 * 60 * 8 //a cada 8h
	}
}
