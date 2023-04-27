/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-143.8': 'linear-gradient(143.8deg, var(--tw-gradient-stops))'
			},
			fontFamily: {
				sans: ['Inter', 'Lexend'],
				primary: ['Inter', 'sans-serif'],
				secondary: ['Lexend', 'sans-serif']
			}
		}
	},
	plugins: []
}
