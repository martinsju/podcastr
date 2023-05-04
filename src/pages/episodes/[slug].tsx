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
		<div id='container' className='w-full overflow-y-scroll'>
			<div
				id='episode'
				className='py-12 px-8 max-w-[45rem] h-[calc(100vh-6.5rem)] my-0 mx-auto'
			>
				<div id='thumbnailContainer' className='relative'>
					<button
						type='button'
						className='w-12 h-12 p-3 text-[0] rounded-xl border-0 absolute z-[5] transition duration-200 hover:brightness-95 left-0 top-1/2 bg-blue-500 -translate-x-1/2 -translate-y-1/2'
					>
						<Image
							width={192}
							height={192}
							src='/arrow-left.svg'
							alt='Voltar'
							className='rounded-2xl'
						/>
					</button>
					<Image
						width={700}
						height={160}
						src={episode.thumbnail}
						alt={episode.title}
						style={{ objectFit: 'cover' }}
						className='rounded-2xl w-[700px] h-[160px]'
					/>
					<button
						type='button'
						className='w-12 h-12 p-3 text-[0] rounded-xl border-0 absolute z-[5] transition duration-200 hover:brightness-95 right-0 top-1/2 bg-green-500 translate-x-1/2 -translate-y-1/2'
					>
						<Image
							width={192}
							height={192}
							src='/play.svg'
							alt='Tocar episódio'
							className='rounded-2xl'
						/>
					</button>
				</div>

				<header className='pb-4 border-b border-b-gray-200'>
					<h1 className='mt-8 mb-6 text-gray-800 leading-10 font-semibold font-secondary no-underline hover:underline'>
						{episode.title}
					</h1>
					<span className='inline-block text-sm '>{episode.members}</span>
					<span className='inline-block text-sm ml-4 pl-4 relative before:content-[""] before:w-1 before:h-1 before:rounded-sm before:bg-[#DDD] before:absolute before:left-0 before:top-1/2 before:translate-x-[-50%] before:translate-y-[-50%]'>
						{episode.publishedAt}
					</span>
					<span className='inline-block text-sm ml-4 pl-4 relative before:content-[""] before:w-1 before:h-1 before:rounded-sm before:bg-[#DDD] before:absolute before:left-0 before:top-1/2 before:translate-x-[-50%] before:translate-y-[-50%]'>
						{episode.durationAsString}
					</span>
				</header>

				<div
					id='description'
					className='mt-8 leading-[1.675rem] text-gray-700 [&>p]:my-6 [&>p]:mx-0'
					dangerouslySetInnerHTML={{ __html: episode.description }}
				/>
			</div>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await api.get('episodes', {
		params: {
			_limit: 2,
			_sort: 'published_at',
			_order: 'desc'
		}
	})

	const paths = data.map((episode: Episode) => {
		return {
			params: {
				slug: episode.id
			}
		}
	})

	return {
		paths: [],
		fallback: 'blocking'
		//fallback: true -> runs request on client side
		//fallback: 'blocking' -> runs request on node.js (next side)
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
