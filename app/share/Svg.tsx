import React from "react";
import { motion } from "framer-motion";
import {useColor} from 'color-thief-react'

const Svg = ({ TailwindClass, pic}: { TailwindClass: string, pic?: string }) => {
  const {data, loading, error} = useColor(pic??'', 'hex', {crossOrigin: 'res.cloudinary.com', quality: 70})

  return (
    <motion.svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 0 1440 390"
      xmlns="http://www.w3.org/2000/svg"
      className={`${TailwindClass} rotate-180`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient" x1="88%" y1="83%" x2="12%" y2="17%">
          <stop offset="5%" stopColor="#000000"></stop>
          <stop offset="95%" stopColor={(!loading && !error && data) ? data : "#9900ef"}></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 L 0,0 C 116.22966507177034,66.20095693779903 232.45933014354068,132.40191387559807 323,140 C 413.5406698564593,147.59808612440193 478.3923444976076,96.59330143540669 562,84 C 645.6076555023924,71.40669856459331 747.9712918660288,97.22488038277513 852,100 C 956.0287081339712,102.77511961722487 1061.7224880382776,82.50717703349282 1160,62 C 1258.2775119617224,41.49282296650718 1349.1387559808613,20.74641148325359 1440,0 L 1440,400 L 0,400 Z"
        fill="url(#gradient)"
        fillOpacity="0.53"
        className="background-path"
      ></path>

      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        d="M 0,400 L 0,0 C 116.22966507177034,66.20095693779903 232.45933014354068,132.40191387559807 323,140 C 413.5406698564593,147.59808612440193 478.3923444976076,96.59330143540669 562,84 C 645.6076555023924,71.40669856459331 747.9712918660288,97.22488038277513 852,100 C 956.0287081339712,102.77511961722487 1061.7224880382776,82.50717703349282 1160,62 C 1258.2775119617224,41.49282296650718 1349.1387559808613,20.74641148325359 1440,0 L 1440,400 L 0,400 Z"
        stroke={(!loading && !error && data) ? data : "url(#gradient)"}
        // 
        strokeWidth="5"
        fill="none"
      ></motion.path>
    </motion.svg>
  );
};

export default Svg;
