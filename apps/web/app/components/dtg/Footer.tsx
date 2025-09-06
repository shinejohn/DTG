import React from 'react';
import { Link } from 'react-router';
export function Footer() {
  return <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Global Explorer</h3>
            <p className="text-gray-300 mb-4">
              Discover amazing experiences in cities around the world.
            </p>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dtg/explore" className="text-gray-300 hover:text-white">
                  Cities
                </Link>
              </li>
              <li>
                <Link to="/dtg/trending" className="text-gray-300 hover:text-white">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/dtg/events" className="text-gray-300 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/dtg/deals" className="text-gray-300 hover:text-white">
                  Deals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/auth/sign-in" className="text-gray-300 hover:text-white">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/auth/sign-up" className="text-gray-300 hover:text-white">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/home/rewards" className="text-gray-300 hover:text-white">
                  Rewards
                </Link>
              </li>
              <li>
                <Link to="/home/settings" className="text-gray-300 hover:text-white">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Global Explorer. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white">
              Terms
            </Link>
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white">
              Privacy
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}
