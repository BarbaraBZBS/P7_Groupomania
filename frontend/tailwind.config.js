/** @type {import('tailwindcss').Config} */
const colors = require( 'tailwindcss/colors' )

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
        fontFamily: {
            txt: [ 'Lato', 'sans-serif' ]
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            stone: colors.stone,
            indigo: colors.indigo,
            violet: colors.violet,
            pink: colors.pink,
            red: colors.rose,
            yellow: colors.amber,
            green: colors.lime,
            appblck: '#00070A',
            appred: '#FD2D01',
            apppink: '#FFD7D7',
            apppinklight: '#ffe0e0',
            appstone: '#4E5166'
        }
    },
    plugins: [],
}
