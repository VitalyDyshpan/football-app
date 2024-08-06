/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./src/pages/**/*.{js,vue,ts}",
    "./src/app/**/*.{js,vue,ts}",
    "./src/widgets/**/*.{js,vue,ts}",
    "./src/shared/**/*.{js,vue,ts}",
    "./src/feature/**/*.{js,vue,ts}",
    "./src/entities/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.{js,vue,ts}",
    "./error.{js,vue,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        270: "1080px"
      },
      colors: {
        transparent: "transparent",
        white: "#FFF",
        primary: "#72A177",
        secondary: "#B4A485",
        additional: "#718C7D",
        non_active: "#A4C8A7",
        stroke: "#C7C7C7",
        text: "#1E422F",
        accentuation: "#D9C9A6",
        filling: "#F6F6F6",
        accent_fill: "#F5F0E5",
        accent_fill_light: "#FAF7F1",
        error: "#C12D2D"
      },
      fontSize: {
        xs: ["12px", "14px"],
        sm: ["14px", "20px"],
        DEFAULT: ["16px", "20px"],
        base: ["16px", "20px"],
        lg: ["18px", "24px"],
        xl: ["20px", "24px"],
        xxl: ["22px", "26px"],
        headline: ["26px", "30px"],
        title: ["48px", "56px"]
      },
      borderRadius: {
        DEFAULT: "100px",
        8: "8px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
        32: "32px",
        48: "48px",
        100: "100px",
        120: "120px"
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        overlayFadeEnter: "overlayFadeEnter 0.3s forwards",
        overlayFadeLeave: "overlayFadeLeave 0.3s forwards"
      },
      keyframes: {
        overlayFadeEnter: {
          "0%": {
            backgroundColor: "transparent"
          },
          "100%": {
            backgroundColor: "rgba(0, 0, 0, 0.4)"
          }
        },
        overlayFadeLeave: {
          "0%": {
            backgroundColor: "rgba(0, 0, 0, 0.4)"
          },
          "100%": {
            backgroundColor: "transparent"
          }
        }
      }
    }
  },
  plugins: [],
};

