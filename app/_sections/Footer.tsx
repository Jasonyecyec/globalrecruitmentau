import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1e1147] px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold">For Global Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Browse International Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Submit Global Resume
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Worldwide Job Alerts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">For Global Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Post International Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Global Hiring Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Worldwide Recruitment Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">About RPG</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Our Global Presence
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  International Partnerships
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Global Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Connect Globally</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  LinkedIn
                </Link>
              </li>

              <li className="pt-4 text-gray-300">
                <p className="font-semibold">admin@recruitmentglobal.com</p>
                <p className="font-semibold">+61 415 902 882</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-300">
          <p>© 2025 Global Recruitment. Connecting talent worldwide. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
