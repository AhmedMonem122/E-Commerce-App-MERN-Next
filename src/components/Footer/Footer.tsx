import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-slate-600 dark:text-slate-300">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tech Haven
            </h3>
            <p className="mt-3 text-sm leading-relaxed max-w-sm">
              Your trusted place for electronics and gadgets. Explore products,
              brands, and categories from the best tech manufacturers worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-8 border-slate-200 dark:border-slate-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; 2026 Ahmed Monem. All rights reserved.</p>

          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
