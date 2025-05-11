import React from "react";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">
              NGUYEN
              <br />
              DUY
              <br />
              THANH
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nghệ sĩ trình diễn và biên đạo
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ngdthanh"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/ngduythanh"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Music
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Tour
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              For booking:
            </p>
            <a
              href="mailto:ngdthanh5@gmail.com"
              className="text-black dark:text-white hover:underline"
            >
              ngdthanh5@gmail.com
            </a>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} NGUYEN DUY THANH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
