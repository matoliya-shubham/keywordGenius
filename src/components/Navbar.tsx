import { useState } from "react";
import { Menu, X, Settings, User } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`w-full md:h-[var(--header-height)] bg-white shadow-sm  relative`}
    >
      <nav className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={22} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={22} />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute bg-white border-t-red-500 top-[102%] left-0 right-0 w-full h-max pb-3 flex flex-col shadow-sm">
          <button className="flex items-center gap-2 py-3 w-full hover:bg-gray-100 border-b">
            <Settings size={20} className="ml-4" /> Settings
          </button>
          <button className="flex items-center gap-2 py-3 w-full hover:bg-gray-100">
            <User size={20} className="ml-4" /> Profile
          </button>
        </div>
      )}
    </header>
  );
}
