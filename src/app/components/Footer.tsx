import { motion } from "motion/react";
import { MapPin, Instagram, Facebook, Mail, Phone, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const YEAR = new Date().getFullYear();

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (location.pathname === "/") {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{ background: "#02020d", borderTop: "1px solid rgba(0,245,255,0.1)" }}
    >
      {/* Top grid neon */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00f5ff, #b700ff, #ff00ea, transparent)" }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.8) 3px, rgba(0,245,255,0.8) 4px)" }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-5 blur-[80px]"
        style={{ background: "radial-gradient(ellipse, #00f5ff, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://i.imgur.com/VZp3k22.jpeg"
                alt="Geek Zone"
                className="h-12 w-12 rounded-xl object-cover"
                style={{ border: "1px solid rgba(0,245,255,0.4)", boxShadow: "0 0 15px rgba(0,245,255,0.3)" }}
              />
              <div>
                <div
                  className="text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.1rem", fontWeight: 800 }}
                >
                  GEEK<span style={{ color: "#00f5ff" }}>ZONE</span>
                </div>
                <div
                  className="text-gray-500"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.38rem", letterSpacing: "0.08em" }}
                >
                  TIENDA GAMER
                </div>
              </div>
            </div>

            <p
              className="text-gray-400 mb-5"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}
            >
              Tu tienda gamer de confianza en Colombia. Consolas, videojuegos y accesorios originales con garantía oficial.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <motion.a
                href="https://www.instagram.com/tiendageekzone/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                  boxShadow: "0 0 15px rgba(253,29,29,0.3)",
                }}
                whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(253,29,29,0.5)" }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={17} className="text-white" />
              </motion.a>

              <motion.a
                href="https://www.facebook.com/tiendageekzone"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "#1877f2",
                  boxShadow: "0 0 15px rgba(24,119,242,0.3)",
                }}
                whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(24,119,242,0.5)" }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={17} className="text-white" />
              </motion.a>

              <motion.a
                href="mailto:info@geekzone.com.co"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(0,245,255,0.1)",
                  border: "1px solid rgba(0,245,255,0.3)",
                }}
                whileHover={{ scale: 1.15, background: "rgba(0,245,255,0.2)", boxShadow: "0 0 20px rgba(0,245,255,0.3)" }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={17} className="text-[#00f5ff]" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white mb-5"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}
            >
              NAVEGACIÓN
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", href: "#hero" },
                { label: "Categorías", href: "#categories" },
                { label: "Productos", href: "#products" },
                { label: "Nosotros", href: "#why" },
                { label: "Testimonios", href: "#testimonials" },
                { label: "Newsletter", href: "#newsletter" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#00f5ff] transition-colors group"
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.92rem" }}
                  >
                    <span className="text-[#00f5ff]/40 group-hover:text-[#00f5ff] transition-colors">▸</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="text-white mb-5"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}
            >
              CATEGORÍAS
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Xbox Series X/S", color: "#107c10" },
                { label: "PlayStation 5", color: "#003791" },
                { label: "Videojuegos", color: "#ff00ea" },
                { label: "Accesorios Gamer", color: "#00f5ff" },
                { label: "Ofertas y Bundles", color: "#ffd700" },
                { label: "Nuevos Lanzamientos", color: "#39ff14" },
              ].map((cat) => (
                <li key={cat.label}>
                  <button
                    onClick={() => scrollTo("#products")}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.92rem" }}
                  >
                    <span
                      className="w-2 h-2 rounded-sm flex-shrink-0"
                      style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                    />
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white mb-5"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}
            >
              CONTACTO
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.2)" }}
                >
                  <MapPin size={14} className="text-[#00f5ff]" />
                </div>
                <div>
                  <p
                    className="text-gray-400"
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", lineHeight: 1.6 }}
                  >
                    Calle 7C Bis # 72B - 24
                    <br />
                    Bogotá, Colombia
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.2)" }}
                >
                  <Phone size={14} className="text-[#39ff14]" />
                </div>
                <a
                  href="tel:+573001234567"
                  className="text-gray-400 hover:text-[#39ff14] transition-colors"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem" }}
                >
                  +57 300 123 4567
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,0,234,0.1)", border: "1px solid rgba(255,0,234,0.2)" }}
                >
                  <Mail size={14} className="text-[#ff00ea]" />
                </div>
                <a
                  href="mailto:info@geekzone.com.co"
                  className="text-gray-400 hover:text-[#ff00ea] transition-colors"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem" }}
                >
                  info@geekzone.com.co
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)" }}
                >
                  <Instagram size={14} className="text-[#ffd700]" />
                </div>
                <a
                  href="https://www.instagram.com/tiendageekzone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#ffd700] transition-colors"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem" }}
                >
                  @tiendageekzone
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-gray-600 text-center"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.82rem" }}
          >
            © {YEAR} Geek Zone · Todos los derechos reservados · Bogotá, Colombia
          </p>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-[#00f5ff]" />
            <span
              className="text-gray-600"
              style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.38rem", letterSpacing: "0.08em" }}
            >
              POWERED BY GEEK ZONE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}