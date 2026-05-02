import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInicio = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      scrollToSection("#hero");
    } else {
      navigate("/");
    }
  };

  const handleProductos = () => {
    setMenuOpen(false);
    navigate("/productos");
  };

  const handleContacto = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      scrollToSection("#footer");
    } else {
      navigate("/");
      setTimeout(() => {
        document.querySelector("#footer")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  const navLinks = [
    { label: "Inicio", action: handleInicio },
    { label: "Productos", action: handleProductos },
    { label: "Contacto", action: handleContacto },
  ];

  const isActive = (label: string) => {
    if (label === "Productos") return location.pathname === "/productos";
    if (label === "Inicio") return location.pathname === "/";
    return false;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030311]/95 backdrop-blur-md border-b border-[#00f5ff]/20 shadow-[0_0_30px_rgba(0,245,255,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              onClick={handleInicio}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src="https://i.imgur.com/VZp3k22.jpeg"
                  alt="Geek Zone"
                  className="h-10 w-10 rounded-lg object-cover border border-[#00f5ff]/40 shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                />
                <div className="absolute inset-0 rounded-lg bg-[#00f5ff]/10 group-hover:bg-[#00f5ff]/20 transition-colors" />
              </div>
              <span
                className="text-white hidden sm:block"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                }}
              >
                GEEK<span style={{ color: "#00f5ff", textShadow: "0 0 10px #00f5ff" }}>ZONE</span>
              </span>
            </motion.button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="relative group transition-colors duration-200"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    letterSpacing: "0.08em",
                    color: isActive(link.label) ? "#00f5ff" : "#d1d5db",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#00f5ff] transition-all duration-300 shadow-[0_0_8px_#00f5ff]"
                    style={{ width: isActive(link.label) ? "100%" : "0%" }}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00f5ff] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#00f5ff] opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>

            {/* Cart + Hamburger */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={openCart}
                className="relative p-2 rounded-lg border border-[#00f5ff]/30 bg-[#00f5ff]/5 hover:bg-[#00f5ff]/15 hover:border-[#00f5ff]/60 transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart
                  size={20}
                  className="text-[#00f5ff] group-hover:drop-shadow-[0_0_8px_#00f5ff]"
                />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#ff00ea] text-white text-xs flex items-center justify-center shadow-[0_0_10px_#ff00ea]"
                      style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.6rem" }}
                    >
                      {totalItems > 99 ? "99+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                className="md:hidden p-2 text-[#00f5ff]"
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>

              <motion.button
                onClick={handleProductos}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00f5ff] text-[#030311] hover:bg-white transition-colors duration-200 group"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,245,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={14} className="group-hover:animate-bounce" />
                COMPRAR
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#030311]/98 backdrop-blur-xl border-b border-[#00f5ff]/20 px-6 py-6"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={link.action}
                  className="text-left border-b border-white/5 pb-3 transition-colors"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                    color: isActive(link.label) ? "#00f5ff" : "#e5e7eb",
                  }}
                >
                  <span className="text-[#00f5ff] mr-2">&gt;</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={handleProductos}
                className="mt-2 py-3 rounded-lg bg-[#00f5ff] text-[#030311] text-center flex items-center justify-center gap-2"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem", fontWeight: 700 }}
              >
                <Zap size={14} />
                COMPRAR AHORA
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}