/** @type {import('tailwindcss').Config} */
const colors = require( 'tailwindcss/colors' )

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                spin: {
                    from: { transform: 'rotate( 0deg )' },
                    to: { transform: 'rotate( 360deg )' }
                },
                scale: {
                    from: { transform: 'scaleY( 0 )' },
                    to: { transform: 'scaleY( 1 )' }
                }
            },
            animation: {
                spin: 'spin infinite 1.3s linear',
                scale: 'scale 1s ease forwards'
            }
        },
        fontFamily: {
            txt: [ 'Lato', 'sans-serif' ]
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.neutral,
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
            appstone: '#4E5166',
            appopred: '#01D1FD',
            appoppink: '#D7FFFF',
            appopstone: '#66634E',
            appsand: '#fdfdf9'
        }
    },
    plugins: [],
}
