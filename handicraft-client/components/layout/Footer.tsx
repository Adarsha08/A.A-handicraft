import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-brown text-bg-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-widest">
                A.A. HANDICRAFT
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent-gold">
                Preserving Himalayan Heritage
              </span>
            </Link>
            <p className="text-sm text-bg-cream/60 leading-relaxed max-w-xs">
              Directly from the artisans of Kathmandu, we bring you authentic,
              museum-quality Nepali handicrafts that tell stories of ancient
              traditions and cultural spiritualism.
            </p>
            <div className="flex space-x-4 text-sm">
              <a
                href="#"
                className="hover:text-accent-gold transition-colors font-medium"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-accent-gold transition-colors font-medium"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-accent-gold transition-colors font-medium"
              >
                X
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-accent-gold">
              Categories
            </h3>
            <ul className="space-y-4 text-sm text-bg-cream/70">
              <li>
                <Link
                  href="/shop?category=Religious"
                  className="hover:text-bg-cream transition-colors"
                >
                  Religious & Spiritual
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Jewelry"
                  className="hover:text-bg-cream transition-colors"
                >
                  Traditional Jewelry
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Wood"
                  className="hover:text-bg-cream transition-colors"
                >
                  Wooden Crafts
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Textile"
                  className="hover:text-bg-cream transition-colors"
                >
                  Pashmina & Textiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-accent-gold">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm text-bg-cream/70">
              <li>
                <Link
                  href="/about"
                  className="hover:text-bg-cream transition-colors"
                >
                  About Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-bg-cream transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-bg-cream transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-bg-cream transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-accent-gold">
              Kathmandu Shop
            </h3>
            <ul className="space-y-4 text-sm text-bg-cream/70">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Thamel Marg, Jyatha, Kathmandu 44600, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>+977 1-4XXXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>info@aahandicraft.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bg-cream/10 pt-10 text-center">
          <p className="text-[11px] uppercase tracking-widest text-bg-cream/40">
            © {new Date().getFullYear()} A.A. HANDICRAFT. Handcrafted in
            Kathmandu. Export Ready.
          </p>
        </div>
      </div>
    </footer>
  );
}
