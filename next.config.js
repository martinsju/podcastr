/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
				pathname: '/**'
			}
		]
	}
}
//https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/opensource.jpg

module.exports = nextConfig
