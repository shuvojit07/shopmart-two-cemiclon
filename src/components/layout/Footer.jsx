import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
// import { FaGithub, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#181818] text-[#9ca3af] py-16 px-8 md:px-20 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* 1. Logo Section */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="flex items-center gap-2 text-white text-2xl font-semibold">
              <div className="w-8 h-8 border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>ShopMart</span>
            </div>
            <p className="text-sm mt-2">
              Elevating your shopping experience with quality and trust.
            </p>
          </div>

          {/* 2. Product Links */}
          <div>
            <h3 className="text-white text-sm font-bold mb-6 tracking-widest uppercase">
              Product
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                What is Letta
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Customers
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Research
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                News
              </li>
            </ul>
          </div>

          {/* 3. Developers Links */}
          <div>
            <h3 className="text-white text-sm font-bold mb-6 tracking-widest uppercase">
              Developers
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                GitHub <FaGithub />{" "}
                <span className="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">
                  20.6K
                </span>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Documentation
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link href="/community"> Community</Link>{" "}
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Demos
              </li>
            </ul>
          </div>

          {/* 4. Company Links */}
          <div>
            <h3 className="text-white text-sm font-bold mb-6 tracking-widest uppercase">
              Company
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link href="/privacyPolice">Privacy policy</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link href="/terms"> Terms of service</Link>{" "}
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-sm font-bold mb-6 tracking-widest uppercase">
              Newsletter
            </h3>
            <div className="flex items-stretch mb-6">
              {" "}
              {/* mb-6 যোগ করেছি নিচের আইকন থেকে গ্যাপ রাখার জন্য */}
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent border border-gray-700 text-sm py-2.5 pl-10 pr-4 w-full focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <button className="bg-white text-black px-3 hover:bg-gray-200 transition-colors flex items-center justify-center">
                <FiArrowUpRight size={20} />
              </button>
            </div>

            {/* Social Icons Section */}
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="hover:text-white transition-colors text-xl"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors text-xl"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors text-xl"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors text-xl"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section (Optional) */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 ShopMart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
