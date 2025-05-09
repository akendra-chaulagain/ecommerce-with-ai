// components/Footer.jsx
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white mt-[60px]">
      {/* Newsletter Section */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="mb-6">
              <Image
                src="/favicon.png"
                alt="Brand Logo"
                width={150}
                height={50}
                className=""
              />
            </div>
            <p className="mb-6">
              Discover the latest fashion trends with our curated collections.
              Quality fabrics, sustainable practices, and styles that stand the
              test of time.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Shopping */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Shopping</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/women"
                  className="hover:text-white transition-colors"
                >
                  Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/category/men"
                  className="hover:text-white transition-colors"
                >
                  Men&apos;s Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/sale"
                  className="hover:text-white transition-colors"
                >
                  Sale Items
                </Link>
              </li>
              <li>
                <Link
                  href="/lookbook"
                  className="hover:text-white transition-colors"
                >
                  Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-returns"
                  className="hover:text-white transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-white transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0" />
                <span>
                  123 Fashion Street, Design District, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0" />
                <span>support@yourfashionstore.com</span>
              </li>
            </ul>
            {/* <div className="mt-6">
              <h4 className="text-white font-medium mb-3">We Accept</h4>
              <div className="flex space-x-3">
                <div className="w-10 h-6 bg-white rounded"></div>
                <div className="w-10 h-6 bg-white rounded"></div>
                <div className="w-10 h-6 bg-white rounded"></div>
                <div className="w-10 h-6 bg-white rounded"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              © 2025 Your Fashion Brand. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <span>|</span>
              <Link
                href="/sitemap"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
