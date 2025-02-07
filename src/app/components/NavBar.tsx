'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const links = [
  {href: "/about", text: "ABOUT"}, 
  {href: "/build", text: "BUILD"}, 
  {href: "/learn", text: "LEARN"}, 
  {href: "/race", text: "RACE"}, 
  {href: "/course", text: "COURSE"}, 
  {href: "/research", text: "RESEARCH"}, 
  {href:"/forum", text:"FORUM"}];

export default function Navbar() {
  const currentPath = usePathname();
  const isAltNav = currentPath === "/learn" || currentPath === "/build" || currentPath === "/course";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  //autoatically close navbar dropdown when screen gets bigger
  useEffect(() => {
    function handleResize() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", handleResize);
    
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <nav className={`${isAltNav ? "navbar-alt dotted-bg" : "navbar"}`}>
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logos/logo-white.svg"
          className="w-[100px] min-w-[80px] max-w-[120px] h-auto flex-shrink-0 -mt-[3px]"
          alt="RoboRacer Logo"
          priority
          width={100}
          height={50}
        />
      </Link>


      {/* Nav Links */}
      <div className="hidden md:flex flex-row items-center gap-6 ml-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="open-sans-font">
            <p
              className={`text-sm  transition-colors ${
                currentPath === link.href ? "text-red-500" : "hover:italic text-white"
              }`}
            >
              {link.text}
            </p>
          </Link>
        ))}
      </div>
    <button className="ml-auto md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <Image
          src="/buttons/three-lines.svg"
          className="h-6"
          alt="Menu Button"
          width={30}
          height={15}
        />
      </button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-black bg-opacity-90 p-4 flex flex-col items-center shadow-lg md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            {links.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link href={link.href} className="block text-white text-md py-2 hover:text-red-400" onClick={() => setMenuOpen(false)}>
                  {link.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
