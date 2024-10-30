/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d4fae3',  
        secondary: '#5ae1a9', 
      },
    },
  },
  plugins: [],
};
