import React from 'react'

const Svg = ({ TailwindClass }: { TailwindClass: string }) => {
    return (
        <svg
            width="100%"
            height="100%"
            id="svg"
            viewBox="0 0 1440 390"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition duration-300 ease-in-out delay-150 ${TailwindClass}`}
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="gradient" x1="91%" y1="78%" x2="9%" y2="22%">
                    <stop offset="5%" stopColor="#000000" />
                    <stop offset="95%" stopColor="#9900ef" />
                </linearGradient>
            </defs>
            <path
                d="M 0,400 L 0,0 C 123.49282296650719,60.96650717703349 246.98564593301438,121.93301435406698 337,146 C 427.0143540669856,170.06698564593302 483.5502392344497,157.23444976076553 556,139 C 628.4497607655503,120.76555023923446 716.8133971291867,97.12918660287082 825,95 C 933.1866028708133,92.87081339712918 1061.1961722488036,112.2488038277512 1167,100 C 1272.8038277511964,87.7511961722488 1356.4019138755982,43.8755980861244 1440,0 L 1440,400 L 0,400 Z"
                stroke="none"
                strokeWidth="0"
                fill="url(#gradient)"
                fillOpacity="0.53"
                className="transition-all duration-300 ease-in-out delay-150 path-0"
                transform="rotate(-180 720 200)"
            />
            <path
                d="M 0,400 L 0,0 C 116.5358851674641,110.80382775119617 233.0717703349282,221.60765550239233 318,261 C 402.9282296650718,300.39234449760767 456.2488038277513,268.37320574162686 537,238 C 617.7511961722487,207.62679425837317 725.933014354067,178.89952153110045 821,184 C 916.066985645933,189.10047846889955 998.0191387559807,228.02870813397132 1099,203 C 1199.9808612440193,177.97129186602868 1319.9904306220096,88.98564593301434 1440,0 L 1440,400 L 0,400 Z"
                stroke="none"
                strokeWidth="0"
                fill="url(#gradient)"
                fillOpacity="1"
                className="transition-all duration-300 ease-in-out delay-150 path-1"
                transform="rotate(-180 720 200)"
            />
        </svg>
    )
}

export default Svg