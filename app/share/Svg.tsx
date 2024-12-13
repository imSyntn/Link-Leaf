import React from "react";

const Svg = ({ TailwindClass }: { TailwindClass: string }) => {
  return (
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 0 1440 390"
      xmlns="http://www.w3.org/2000/svg"
      className={`${TailwindClass}`} preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient" x1="88%" y1="83%" x2="12%" y2="17%">
          <stop offset="5%" stop-color="#000000"></stop>
          <stop offset="95%" stop-color="#9900ef"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 L 0,0 C 116.22966507177034,66.20095693779903 232.45933014354068,132.40191387559807 323,140 C 413.5406698564593,147.59808612440193 478.3923444976076,96.59330143540669 562,84 C 645.6076555023924,71.40669856459331 747.9712918660288,97.22488038277513 852,100 C 956.0287081339712,102.77511961722487 1061.7224880382776,82.50717703349282 1160,62 C 1258.2775119617224,41.49282296650718 1349.1387559808613,20.74641148325359 1440,0 L 1440,400 L 0,400 Z"
        stroke="none"
        stroke-width="0"
        fill="url(#gradient)"
        fill-opacity="0.53"
        className="transition-all duration-300 ease-in-out delay-150 path-0"
        transform="rotate(-180 720 200)"
      ></path>
      <defs>
        <linearGradient id="gradient" x1="88%" y1="83%" x2="12%" y2="17%">
          <stop offset="5%" stop-color="#000000"></stop>
          <stop offset="95%" stop-color="#9900ef"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 L 0,0 C 84.54545454545456,79.99043062200955 169.09090909090912,159.9808612440191 260,200 C 350.9090909090909,240.0191387559809 448.18181818181813,240.06698564593302 551,232 C 653.8181818181819,223.93301435406698 762.1818181818182,207.75119617224883 873,214 C 983.8181818181818,220.24880382775117 1097.0909090909092,248.92822966507177 1192,217 C 1286.9090909090908,185.07177033492823 1363.4545454545455,92.53588516746412 1440,0 L 1440,400 L 0,400 Z"
        stroke="none"
        stroke-width="0"
        fill="url(#gradient)"
        fill-opacity="1"
        className="transition-all duration-300 ease-in-out delay-150 path-1"
        transform="rotate(-180 720 200)"
      ></path>
    </svg>
  );
};

export default Svg;
