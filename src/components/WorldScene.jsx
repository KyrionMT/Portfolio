export default function WorldScene() {
  return (
    <svg
      className="world-scene"
      viewBox="0 0 720 550"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="wbg"
          x1="350"
          y1="0"
          x2="350"
          y2="550"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1d3027" />
          <stop offset="1" stopColor="#101b1a" />
        </linearGradient>
        <linearGradient
          id="portal"
          x1="330"
          y1="100"
          x2="400"
          y2="320"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f6efbc" />
          <stop offset=".55" stopColor="#baf981" />
          <stop offset="1" stopColor="#5db3a0" stopOpacity=".2" />
        </linearGradient>
        <linearGradient
          id="rock"
          x1="150"
          y1="300"
          x2="500"
          y2="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6b7863" />
          <stop offset="1" stopColor="#263d3c" />
        </linearGradient>
        <linearGradient
          id="arch"
          x1="290"
          y1="70"
          x2="380"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e0e5bf" />
          <stop offset="1" stopColor="#76866c" />
        </linearGradient>
        <radialGradient id="wglow">
          <stop stopColor="#baf981" stopOpacity=".24" />
          <stop offset="1" stopColor="#baf981" stopOpacity="0" />
        </radialGradient>
        <filter id="wblur">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <pattern
          id="wgrid"
          width="55"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 16 27.5 0 55 16 27.5 32Z"
            stroke="#a8d6ad"
            strokeOpacity=".07"
            strokeWidth=".7"
          />
        </pattern>
      </defs>
      <path fill="url(#wbg)" d="M0 0h720v550H0z" />
      <path fill="url(#wgrid)" d="M0 0h720v550H0z" />
      <ellipse cx="360" cy="265" rx="255" ry="220" fill="url(#wglow)" />
      <ellipse
        cx="359"
        cy="440"
        rx="170"
        ry="25"
        fill="#060d0c"
        opacity=".65"
        filter="url(#wblur)"
      />
      <g className="floating-island">
        <path d="m141 305 199-113 240 132-196 115Z" fill="#8aa683" />
        <path d="m141 305 243 134-11 67-94-30-32-55-63-17Z" fill="url(#rock)" />
        <path d="m384 439 196-115-27 76-73 12-42 59-65 35Z" fill="#344b44" />
        <path d="m141 305 199-113 240 132-196 115Z" fill="#91ac77" />
        <path d="m162 303 178-101 219 122-175 102Z" fill="#abc48a" />
        <path d="m232 340 28-16 124 68 109-62 25 15-134 77Z" fill="#d1d9ac" />
        <path d="m390 246 57 32-87 49-57-31Z" fill="#81a598" />
        <path d="m390 252 46 26-76 43-46-25Z" fill="#9ee0c3" />
        <path d="m326 298 37 20 60-34" stroke="#d8f3cd" opacity=".55" />
        <path d="m465 357 43-25 32 19-43 25Z" fill="#78b5a3" />
        <path d="m497 376 43-25-7 28-36 22Z" fill="#60af9b" />
        <path d="m498 392 31-17-4 65-31 20Z" fill="#94e9c6" opacity=".6" />
        <path d="m297 275 18-10 22 12-18 11Z" fill="#eff0cc" />
        <path d="m299 276 20 12v13l-20-12Z" fill="#718d70" />
        <path
          d="M292 265V147c0-56 37-93 79-70l43 25c25 15 37 41 37 78v118l-26 15V186c0-34-9-52-27-63l-33-19c-28-16-48 6-48 47v128Z"
          fill="#657963"
        />
        <path
          d="M268 252V133c0-55 37-92 79-69l43 25c25 15 37 41 37 78v118l-26 15V173c0-33-9-51-27-62l-33-19c-28-16-48 6-48 47v128Z"
          fill="url(#arch)"
        />
        <path d="m268 252 24 13 25 14-24-12Z" fill="#e7edc9" />
        <path
          d="M294 264V139c0-39 19-62 47-46l33 19c18 11 27 28 27 61v126Z"
          fill="url(#portal)"
        />
        <path
          d="M305 248V142c0-31 13-45 34-33l29 17c14 8 21 23 21 50v104Z"
          stroke="#f1ffd4"
          strokeOpacity=".65"
        />
        <path d="m347 194 15-25 15 43-15 25Z" fill="#efffd6" />
        <path d="m347 194 15 6v37Z" fill="#c3f98c" />
        <g>
          <path d="m215 275 12-7v46l-12 7Z" fill="#716148" />
          <path d="m196 247 26-15 27 15v32l-27 16-26-15Z" fill="#52755b" />
          <path d="m196 247 26 15 27-15-27-15Z" fill="#b7d79b" />
          <path d="m222 262 27-15v32l-27 16Z" fill="#779867" />
          <path d="m204 223 18-11 19 11v27l-19 11-18-11Z" fill="#8fb47b" />
          <path d="m204 223 18 10 19-10-19-11Z" fill="#d0e8a9" />
        </g>
        <g transform="translate(299 31) scale(.8)">
          <path d="m215 275 12-7v46l-12 7Z" fill="#716148" />
          <path d="m196 247 26-15 27 15v32l-27 16-26-15Z" fill="#52755b" />
          <path d="m196 247 26 15 27-15-27-15Z" fill="#b7d79b" />
          <path d="m222 262 27-15v32l-27 16Z" fill="#779867" />
          <path d="m204 223 18-11 19 11v27l-19 11-18-11Z" fill="#8fb47b" />
          <path d="m204 223 18 10 19-10-19-11Z" fill="#d0e8a9" />
        </g>
        <g transform="translate(65 114) scale(.7)">
          <path d="m215 275 12-7v46l-12 7Z" fill="#716148" />
          <path d="m196 247 26-15 27 15v32l-27 16-26-15Z" fill="#52755b" />
          <path d="m196 247 26 15 27-15-27-15Z" fill="#b7d79b" />
          <path d="m222 262 27-15v32l-27 16Z" fill="#779867" />
        </g>
        <path d="m368 359 12-7 13 7v20l-13 8-12-7Z" fill="#252c2c" />
        <path d="m369 342 11-6 12 6v15l-12 7-11-6Z" fill="#f4d4a1" />
        <path d="m369 342 11 6 12-6-12-6Z" fill="#ffe4b7" />
        <path
          d="m369 359 11 6 13-6 6 17-9 5-3-11v15l-8 5v-17l-6-5-3 10-8-4Z"
          fill="#eea46e"
        />
        <path d="m373 386 7 4 7-4v16l-7 4-7-4Z" fill="#1c292b" />
        <path d="m175 304 11-6 12 7-11 6Z" fill="#cfdf9b" />
        <path d="m452 320 10-6 11 6-10 6Z" fill="#d6e5a4" />
        <path d="m313 359 9-5 10 5-9 6Z" fill="#c1d595" />
      </g>
      <g className="floating-shard">
        <path d="m555 155 24-14 25 14v29l-25 15-24-15Z" fill="#728e70" />
        <path d="m555 155 24 14 25-14-25-14Z" fill="#c9e8a5" />
        <path d="m579 169 25-14v29l-25 15Z" fill="#46644f" />
      </g>
      <g className="floating-shard second">
        <path d="m112 211 15-9 16 9v18l-16 9-15-9Z" fill="#768d6c" />
        <path d="m112 211 15 9 16-9-16-9Z" fill="#d1e5ad" />
      </g>
      <g fill="#d8f5b2">
        <circle cx="474" cy="142" r="2" />
        <circle cx="190" cy="157" r="2" />
        <circle cx="532" cy="244" r="1.5" />
        <circle cx="248" cy="97" r="1.5" />
        <circle cx="469" cy="216" r="2" />
      </g>
      <path
        d="M510 107v16m-8-8h16M169 374v12m-6-6h12"
        stroke="#d0e9ae"
        strokeOpacity=".7"
      />
    </svg>
  );
}
