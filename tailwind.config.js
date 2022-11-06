module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'on-open-chat': {
          from: { width: 0 },
          to: { width: '100vw' }
        },
        'on-close-chat': {
          from: { width: '100vw' },
          to: { width: 0 }
        }
      },
      animation: {
        'on-open-chat': 'on-open-chat 0.5s ease-in-out forwards',
        'on-close-chat': 'on-close-chat 0.5s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
