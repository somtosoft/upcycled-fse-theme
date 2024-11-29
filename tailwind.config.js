/** @type {import('tailwindcss').Config} */
const { withMaterialColors } = require('tailwind-material-colors');
const tailwindConfig = {
	content: [
		'./src/**/*.php',
		'./src/**/*.html',
		'./src/**/*.js',
		'./src/**/*.jsx',
		'./src/**/*.ts',
		'./src/**/*.tsx',
		'./src/**/*.css',
		'./src/**/*.scss',
		'./public/**/*.html',
	],
	theme: {
		extend: {
			fontSize: {
				extraSmall: '0.833rem',
				small: '1rem',
				paragraph: ['1.125rem', '1.8rem'],
				h6: 'calc(1.25rem + 0.1vw)',
				h5: 'calc(1.563rem + 0.1vw)',
				h4: 'calc(1.953rem + 0.1vw)',
				h3: 'calc(2.441rem + 0.1vw)',
				h2: 'calc(3.052rem + 0.1vw)',
				h1: 'calc(3.815rem + 0.1vw)',
			},
			animation: {
				'bounce-slow': 'bounce 5s infinite',
				'fade-in': 'fadeIn 1s',
				'slide-in-left': 'slideInLeft 0.2s',
				'slide-in-right':'slideInRight 0.2s'
			},
			keyframes: {
				slideInLeft: {
					'0%': { transform: 'translateX(-100%)', opacity: 0 },
					'100%': { transform: 'translateX(0)', opacity: 1 },
				},
				slideInRight: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
const colorConfig = {
	primary: '#41C3F1',
};
const themeConfig = {
	// scheme:"content",
	scheme: 'tonalSpot',
	contrast: 0,
	extend: true,
};
module.exports = withMaterialColors(tailwindConfig, colorConfig, themeConfig);
