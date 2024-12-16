import {
  FaXTwitter as Twitter,
  FaInstagram as Instagram,
} from "react-icons/fa6";
import { FiYoutube as Youtube } from "react-icons/fi";
import { BsTiktok as Tiktok } from "react-icons/bs";
import { BiLogoLinkedin as Linkedin } from "react-icons/bi";
import { AiOutlineSpotify as Spotify } from "react-icons/ai";

export const dropdownValue = [
  {
    value: "Youtube",
    label: "Youtube",
  },
  {
    value: "Instagram",
    label: "Instagram",
  },
  {
    value: "Twitter",
    label: "Twitter",
  },
  {
    value: "Tiktok",
    label: "Tiktok",
  },
  {
    value: "Linkedin",
    label: "Linkedin",
  },
  {
    value: "Spotify",
    label: "Spotify",
  },
  {
    value: "Custom",
    label: "Custom",
  },
];

export const iconSelect = (name: string) => {
  if (name == "twitter") {
    return Twitter;
  } else if (name == "youtube") {
    return Youtube;
  } else if (name == "instagram") {
    return Instagram;
  } else if (name == "tiktok") {
    return Tiktok;
  } else if (name == "linkedin") {
    return Linkedin;
  } else if (name == "spotify") {
    return Spotify;
  } else return null;
};
