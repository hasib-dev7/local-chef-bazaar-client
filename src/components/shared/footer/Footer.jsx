import {
  ChefHat,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../container/Container";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/*  */}
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#f07f2c] flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold font-display">
                  LocalChef<span className="text-[#f07f2c]">Bazaar</span>
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Connecting home cooks with food lovers. Fresh, homemade meals
                delivered to your doorstep.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#f07f2c] hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#f07f2c] hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#f07f2c] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#f07f2c] hover:text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 dark:text-gray-300 hover:text-[#f07f2c] transition-colors text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/meals"
                    className="text-gray-600 dark:text-gray-300 hover:text-[#f07f2c] transition-colors text-sm"
                  >
                    Browse Meals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 dark:text-gray-300 hover:text-[#f07f2c] transition-colors text-sm"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-[#f07f2c] transition-colors text-sm"
                  >
                    Become a Chef
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-[#f07f2c]" />
                  support@localchefbazaar.com
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-[#f07f2c]" />
                  +880 1234-567890
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-[#f07f2c] mt-0.5" />
                  House 42, Road 11, Block E, Banani, Dhaka 1213
                </li>
              </ul>
            </div>

            {/* Working Hours */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Working Hours</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 11:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
