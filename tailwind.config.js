const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        horizontalScroll: {
          "0%": { transform: "translate(-60%, 0)" },
          "100%": { transform: "translate(-100%, 0)" },
        },
        heartScale: {
          "0%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        horizontalScroll: "horizontalScroll 240s linear infinite",
        heartScale: "heartScale 250ms ease-in",
      },
      fontFamily: {
        helveticaNeue400: ["'HelveticaNeue-Regular'"],
        helveticaNeue500: ["'HelveticaNeue-Medium'"],
        helveticaNeueLTCom65Md: ["'Helvetica-Neue-LT-Com-65-Medium'"],
        helveticaNeueLTCom85Heavy: ["'Helvetica-Neue-LT-Com-85-Heavy'"],
      },
      fontSize: {
        "200px": ["12.5rem", { lineHeight: "10rem" }],
        "100px": ["6.25rem", { lineHeight: "1" }],
        "160px": ["10rem", { lineHeight: "9rem" }],
        "80px": ["5rem", { lineHeight: "5rem" }],
      },
      height: {
        348: "348px",
        190: "190px",
        250: "250px",
        450: "450px",
        600: "600px",
        472: "472px",
      },
      colors: {
        shocking_pink: "#E25B8B",
        dark: "rgb(17 17 17)",
        green: "rgb(46 154 96)",
        kelly_green: "#2E9A60",
        pink: "rgb(226 91 139)",
        grey: "#E5E5E5",
        mgrey: "#C4C4C4",
        red: "#DA0714",
        grey1: "#EFEFEF",
        grey2: "#636363",
      },
      minHeight: {
        348: "348px",
        580: "580px",
        720: "720px",
      },
      maxWidth: {
        100: "100px",
        "max-w-screen-xl2": "1310px",
      },
      minWidth: {
        100: "100px",
        180: "180px",
      },
      width: {
        100: "100px",
        146: "146px",
        25: "25px",
        240: "240px",
        250: "250px",
        300: "300px",
        420: "420px",
        480: "480px",
        560: "560px",
        540: "540px",
        "product-slides": "calc(100% - 112px)",
        "form-checkout": "calc(100% - 480px)",
      },
      backgroundColor: {
        lightGrey: "#FAFAFA",
        grey: "#EFEFEF",
        grey2: "#636363",
        green: "#2E9A60",
        mgrey: "#C4C4C4",
      },
      backgroundSize: {
        "100%": "100%",
        "80%": "80%",
        12: "12px",
        6: "6px",
      },
      backgroundImage: {
        "rating-full": "url('/assets/images/rating-full.svg')",
        "rating-half": "url('/assets/images/rating-half.svg')",
        "rating-blank": "url('/assets/images/rating-blank.svg')",
        "input-thumb": "url('/assets/images/input-bg.jpg')",
        dropdown: "url('/assets/images/angle-down.svg')",
        "collapse-title": "url('/assets/images/angle-up.svg')",
        breadcrumbs: "url('/assets/images/angle-right.svg')",
        "account-nav": "url('/assets/images/angle-right.svg')",
        sold: "url('/assets/images/sold.svg')",
        plus: "url('/assets/images/plus.svg')",
        "plus-dark": "url('/assets/images/plus2.svg')",
        close: "url('/assets/images/x.svg')",
        minus: "url('/assets/images/minus.svg')",
        "message-arrow": "url('/assets/images/angle-right2.svg')",
        "gannirepeat-grey": "url('/assets/images/GanniRepeat_grey.svg')",
        "gannirepeat-green": "url('/assets/images/GanniRepeat_green.svg')",
        search: "url('/assets/images/search-icon.svg')",
      },
      backgroundPosition: {
        "center-top": "center top",
        "right-center": "right center",
        "left-10-center": "left 10px center",
      },
      spacing: {
        "25%": "25%",
        "100%": "100%",
        18: "4.5rem",
      },
      zIndex: {
        9999: "9999",
        99999: "99999",
      },
      screens: {
        lg: "1025px",
        xl2: "1330px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".scrollbar-thin": {
          "&::-webkit-scrollbar": {
            width: "2px !important",
          },
        },
      });
    }),
  ],
};
