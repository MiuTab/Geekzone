import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Tag, Gamepad2, Target, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PS5_IMG = "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80";
const XBOX_IMG = "https://images.unsplash.com/photo-1607853827120-6847830b38b0?w=600&q=80";

interface MarqueeItem {
  Icon: LucideIcon;
  text: string;
}

const marqueeItems: MarqueeItem[] = [
  { Icon: Zap, text: "HASTA 30% OFF EN PLAYSTATION" },
  { Icon: Gamepad2, text: "BUNDLES XBOX SERIES X" },
  { Icon: Target, text: "ACCESORIOS PRO CON DESCUENTO" },
  { Icon: Trophy, text: "JUEGOS TOP SEMANA" },
  { Icon: Zap, text: "ENVÍO GRATIS COMPRAS +$300K" },
  { Icon: Gamepad2, text: "HASTA 30% OFF EN PLAYSTATION" },
  { Icon: Target, text: "BUNDLES XBOX SERIES X" },
  { Icon: Trophy, text: "ACCESORIOS PRO CON DESCUENTO" },
];

function GlitchText({ text, color }: { text: string; color: string }) {
  return (
    <span className="relative inline-block">
      <span style={{ color }}>{text}</span>
      <motion.span
        className="absolute inset-0"
        style={{ color, mixBlendMode: "screen", clipPath: "inset(0 0 50% 0)" }}
        animate={{ x: [0, -3, 3, -1, 0], opacity: [1, 0.8, 1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function PromoBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="promo" className="py-8 relative overflow-hidden" style={{ background: "#030311" }}>
      {/* Marquee ticker */}
      <div
        className="relative overflow-hidden py-3 mb-0"
        style={{ background: "linear-gradient(90deg, #00f5ff10, #b700ff10, #00f5ff10)", borderTop: "1px solid rgba(0,245,255,0.2)", borderBottom: "1px solid rgba(0,245,255,0.2)" }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => {
            const Icon = item.Icon;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "0.55rem",
                  color: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#ff00ea" : "#ffd700",
                  letterSpacing: "0.05em",
                }}
              >
                <Icon size={10} />
                {item.text}
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Main promo cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PlayStation Promo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between min-h-[320px] cursor-pointer group"
            style={{
              background: "linear-gradient(135deg, #001a5c 0%, #000c2e 50%, #030311 100%)",
              border: "1px solid rgba(0,55,145,0.4)",
            }}
            onClick={scrollToProducts}
            whileHover={{ scale: 1.01, boxShadow: "0 25px 70px rgba(0,55,145,0.4)" }}
          >
            {/* Background image */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
              style={{ backgroundImage: `url(${PS5_IMG})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001a5c]/90 via-[#001a5c]/60 to-transparent" />

            {/* CRT lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)" }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={14} className="text-[#003791]" />
                <span
                  className="text-[#003791] uppercase"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.5rem", letterSpacing: "0.1em", background: "#003791", color: "white", padding: "3px 8px", borderRadius: "4px" }}
                >
                  OFERTA ESPECIAL
                </span>
              </div>

              <h3
                className="text-white mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 900, lineHeight: 1.2 }}
              >
                <GlitchText text="PlayStation" color="#003791" />
                <br />
                <span className="text-white">HASTA</span>{" "}
                <span style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff" }}>30% OFF</span>
              </h3>
              <p
                className="text-gray-400 mb-6"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}
              >
                PS5 consolas, juegos y accesorios DualSense
              </p>

              <motion.button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg, #003791, #0050d0)",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  boxShadow: "0 0 20px rgba(0,55,145,0.5)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,55,145,0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={14} />
                VER OFERTAS
              </motion.button>
            </div>

            {/* Glitch accent */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{
                opacity: [0, 1, 0, 1, 0],
                x: [0, -2, 2, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 4, repeatDelay: 3 }}
            >
              <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "3rem", color: "#003791", opacity: 0.15 }}>
                PS
              </span>
            </motion.div>
          </motion.div>

          {/* Xbox Promo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between min-h-[320px] cursor-pointer group"
            style={{
              background: "linear-gradient(135deg, #002800 0%, #001200 50%, #030311 100%)",
              border: "1px solid rgba(16,124,16,0.4)",
            }}
            onClick={scrollToProducts}
            whileHover={{ scale: 1.01, boxShadow: "0 25px 70px rgba(16,124,16,0.4)" }}
          >
            {/* Background image */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
              style={{ backgroundImage: `url(${XBOX_IMG})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#002800]/90 via-[#002800]/60 to-transparent" />

            {/* CRT lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)" }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.5rem", letterSpacing: "0.1em", background: "#107c10", color: "white", padding: "3px 8px", borderRadius: "4px" }}
                >
                  BUNDLE EXCLUSIVO
                </span>
              </div>

              <h3
                className="text-white mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 900, lineHeight: 1.2 }}
              >
                <GlitchText text="Xbox" color="#107c10" />
                <br />
                <span className="text-white">SERIES X</span>{" "}
                <span style={{ color: "#39ff14", textShadow: "0 0 20px #39ff14" }}>BUNDLES</span>
              </h3>
              <p
                className="text-gray-400 mb-6"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}
              >
                Consola + 2 juegos + Game Pass 3 meses
              </p>

              <motion.button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg, #107c10, #1a9e1a)",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  boxShadow: "0 0 20px rgba(16,124,16,0.5)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,124,16,0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={14} />
                VER BUNDLES
              </motion.button>
            </div>

            <motion.div
              className="absolute top-4 right-4"
              animate={{
                opacity: [0, 1, 0, 1, 0],
                x: [0, 2, -2, 1, 0],
              }}
              transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
            >
              <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "3rem", color: "#107c10", opacity: 0.15 }}>
                X
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}