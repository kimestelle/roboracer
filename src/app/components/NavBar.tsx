'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/about", text: "ABOUT" },
  { href: "/build", text: "BUILD" },
  { href: "/learn", text: "LEARN" },
  { href: "/race", text: "RACE" },
  { href: "/course", text: "COURSE" },
  { href: "/research", text: "RESEARCH" },
  { href: "/forum", text: "FORUM" },
];

export default function Navbar() {
  const currentPath = usePathname();
  const isAltNav = currentPath === "/learn" || currentPath === "/build" || currentPath === "/course";
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState({ left: 0, width: 0, height: "100%" });
  
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  
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

  useEffect(() => {
    if (currentPath === "/" && logoRef.current) {
      setHoverPos({
        left: logoRef.current.offsetLeft,
        width: logoRef.current.offsetWidth,
        height: "100%"
      });
    }
  }, [currentPath]);

  return (
    <nav ref={navRef} className={`${isAltNav ? "navbar-alt dotted-bg" : "navbar"} relative overflow-hidden`}
      onMouseLeave={() => setHoveredIndex(null)}>
      <Link href="/" ref={logoRef}>
        <motion.div
          className="relative flex items-center justify-center"
          onMouseEnter={() => {
            if (logoRef.current) {
              setHoverPos({
                left: logoRef.current.offsetLeft,
                width: logoRef.current.offsetWidth,
                height: "100%"
              });
            }
          }}
        >
          <Image
            src={currentPath === "/" ? "/logos/logo-white-gradient.svg" : "/logos/logo-white.svg"}
            className="w-[100px] min-w-[80px] max-w-[120px] object-cover h-auto flex-shrink-0 -mt-[3px]"
            alt="RoboRacer Logo"
            priority
            width={currentPath === "/" ? 120 : 100}
            height={50}
          />
        </motion.div>
      </Link>

      <div className="hidden md:flex flex-row items-center gap-6 ml-6 text-white relative">
        <motion.div
          className="absolute hover-gradient top-0 bottom-0 rounded-lg -z-10"
          animate={hoveredIndex !== null ? {
            left: hoverPos.left,
            width: hoverPos.width,
            height: hoverPos.height,
            opacity: 0.5,
          } : { 
            left: links.find(link => link.href === currentPath)?.href ? (document.querySelector(`a[href='${currentPath}']`) as HTMLElement)?.offsetLeft || 0 : 0,
            width: links.find(link => link.href === currentPath)?.href ? (document.querySelector(`a[href='${currentPath}']`) as HTMLElement)?.offsetWidth || 0 : 0,
            height: "100%",
            opacity: 0.5, 
           }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        />
        
        <motion.div
          className="absolute select-gradient top-0 bottom-0 rounded-lg -z-10"
          animate={{
            left: links.find(link => link.href === currentPath)?.href ? (document.querySelector(`a[href='${currentPath}']`) as HTMLElement)?.offsetLeft || 0 : 0,
            width: links.find(link => link.href === currentPath)?.href ? (document.querySelector(`a[href='${currentPath}']`) as HTMLElement)?.offsetWidth || 0 : 0,
            height: "100%",
            opacity: 0.7, 
          }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        />

        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-sm transition-colors px-3"
            onMouseEnter={(e) => {
              setHoveredIndex(index);
              setHoverPos({
                left: e.currentTarget.offsetLeft,
                width: e.currentTarget.offsetWidth,
                height: "100%"
              });
            }}
          >
            <span className="relative z-10">{link.text}</span>
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full p-4 flex flex-col items-center gap-2 md:hidden z-[40] text-white"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.05, ease: "easeOut" },
              },
            }}
          >
            {links.map((link) => (
              <motion.div key={link.href} className="black-center-grad flex w-full justify-center hover:text-red-400">
                <Link href={link.href} className="text-md py-2 hover:italic" onClick={() => setMenuOpen(false)}>
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
