import { } from 'react';
import { SiGithub } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="w-full p-5 sm:px-12 pb-5 mt-12 flex flex-wrap items-center justify-between md:px-5">
            <h1 className="text-3xl font-normal font-caveat">Link Leaf</h1>
            <div className="flex flex-col items-end">
                <div className="flex space-x-4">
                    <a href="https://github.com/imSyntn/Link-Leaf" target="_blank" rel="noopener noreferrer">
                        <SiGithub className="text-gray-500 hover:text-white text-[35px] transition-all duration-300" />
                    </a>
                    <a href="https://www.linkedin.com/in/imsyntn/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-gray-500 hover:text-white text-[35px] transition-all duration-300" />
                    </a>
                    <a href="https://twitter.com/imSyntn" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className="text-gray-500 hover:text-white text-[35px] transition-all duration-300" />
                    </a>
                    <a href="https://github.com/sponsors/imSyntn" target="_blank" rel="noopener noreferrer">
                        <FaRegHeart className="text-gray-500 hover:text-red-400 text-[35px] transition-all duration-300" />
                    </a>
                </div>
                <p className="text-gray-100 text-right text-lg mt-2">
                    Website by <a href="https://twitter.com/imSyntn" target="_blank" rel="noopener noreferrer" className="bg-clip-text text-transparent bg-gradient-to-t from-[#b3ffab] to-[#12fff7]"> @imSyntn </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;