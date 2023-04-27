import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '@/components/services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'

interface IParams extends ParsedUrlQuery {
	slug: string
}

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

type EpisodeProps = {
	episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
	return (
		<div
			id='episode'
			className='py-0 px-16 h-[calc(100vh-6.5rem)] overflow-y-scroll'
		>
			<div id='thumbnailContainer'>
				<button type='button'>
					<Image width={192} height={192} src='/arrow-left.svg' alt='Voltar' />
				</button>
				<Image
					width={700}
					height={160}
					src={episode.thumbnail}
					alt={episode.title}
					style={{ objectFit: 'cover' }}
				/>
				<button type='button'>
					<Image
						width={192}
						height={192}
						src='/play.svg'
						alt='Tocar episódio'
					/>
				</button>
			</div>

			<header>
				<h1>{episode.title}</h1>
				<span>{episode.members}</span>
				<span>{episode.publishedAt}</span>
				<span>{episode.durationAsString}</span>
			</header>

			<div
				id='description'
				dangerouslySetInnerHTML={{ __html: episode.description }}
			/>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { slug } = ctx.params as IParams

	const { data } = await api.get(`/episodes/${slug}`)

	console.log('data received is ', data)

	const episode = {
		id: data.id,
		title: data.title,
		thumbnail: data.thumbnail,
		members: data.members,
		publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
			locale: ptBR
		}),
		duration: Number(data.file.duration),
		durationAsString: convertDurationToTimeString(Number(data.file.duration)),
		description: data.description,
		url: data.file.url
	}

	return {
		props: {
			episode
		},
		revalidate: 60 * 60 * 24 // 24 hours
	}
}
