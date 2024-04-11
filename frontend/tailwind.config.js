/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define custom keyframes for the alarm animation
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: '#fbdada' }, // light red
          '50%': { backgroundColor: '#f78181' }, // darker red
        },
      },
      // Reference the keyframes to create a custom animation utility
      animation: {
        'alarm-blink': 'blink 1s linear infinite',
      },
    },
  },
  plugins: [],
}
