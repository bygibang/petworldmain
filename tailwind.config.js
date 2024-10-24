/** @type {import('tailwindcss').Config} */
import { black, transparent, white } from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  important: "#root",
  theme: {
    extend: {},
	 screens: {
		'sm': '320px',
      // => @media (min-width: 320px) { ... }
      'md': '640px',
      // => @media (min-width: 640px) { ... }
		'extramd': '820px',
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
		'1xl': '1420px',
		'2xl': '1536px',
		'3xl': '1680px'
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
      black,
      transparent,
      white,
		background:"#FCFCFF",
		error:"#FF0000",
      primary: {
        100: "#5A00D6",
        200: "#7919FF",
      },
      text_grey: {
			100: "#3B3B3B",
			200: "#49454F",
		},
		"footer-bg": "#313131",
		"footer-link": "#9786E3",
		"hover-bg" : "#F6EFFF",
		"border" : "#E6E6E6"
    },
	 fontSize: {
		'xs': '.75rem',
		'sm': '.875rem',
		'tiny': '.875rem',
		 'base': '1rem',
		 'lg': '1.125rem',
		 'xl': '1.25rem',
		 '2xl': '1.6rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
		 '5xl': '3.3rem',
		 '6xl': '4.1rem',
		'7xl': '5rem',
	  }
  },
  plugins: [],
};
