import Link from "next/link";
import UserActions from "./UserActions";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = async () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          🌍 Tourify
        </Link>

        {/* Nav Items */}
        <ul className="flex space-x-6 font-medium text-gray-700">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-green-600 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Actions */}
        <UserActions />
      </div>
    </nav>
  );
};

export default Navbar;
