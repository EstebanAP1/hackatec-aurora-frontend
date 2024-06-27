import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      textColor: {
        blanco: '#F5F5F5',
        amarillo: '#FDA801',
        rosa: '#FF6375',
        negro: '#201116',
        verde: '#00B4A9'
      },
      backgroundColor: {
        blanco: '#F5F5F5',
        amarillo: '#FDA801',
        rosa: '#FF6375',
        negro: '#201116',
        verde: '#B5E4E1',
        verde_oscuro: '#00B4A9',
        verder_card: ''
      },
      borderColor: {
        blanco: '#F5F5F5',
        amarillo: '#FDA801',
        rosa: '#FF6375',
        negro: '#201116',
        verde: '#00B4A9'
      }
    }
  },
  plugins: []
}
export default config
