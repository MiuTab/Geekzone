import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Truck, ShieldCheck, Star, Headset, Zap, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Envíos Rápidos",
    desc: "Despacho en 24-48 horas. Entregas a todo Colombia con rastreo en tiempo real.",
    color: "#00f5ff",
    glow: "rgba(0,245,255,0.3)",
    pixel: "",
    starPixel: true,
  },
  {
    icon: ShieldCheck,
    title: "Productos Originales",
    desc: "100% auténticos. Distribuidores oficiales de Xbox y PlayStation en Colombia.",
    color: "#39ff14",
    glow: "rgba(57,255,20,0.3)",
    pixel: "◆",
    starPixel: false,
  },
  {
    icon: Award,
    title: "Garantía Oficial",
    desc: "Garantía de fábrica en todos los productos. Soporte técnico especializado.",
    color: "#ffd700",
    glow: "rgba(255,215,0,0.3)",
    pixel: "▲",
    starPixel: false,
  },
  {
    icon: Headset,
    title: "Atención Gamer",
    desc: "Soporte 7 días × 14 horas. Agentes gamer que entienden lo que necesitas.",
    color: "#ff00ea",
    glow: "rgba(255,0,234,0.3)",
    pixel: "●",
    starPixel: false,
  },
  {
    icon: Zap,
    title: "Precios Competitivos",
    desc: "Los mejores precios del mercado. Ofertas semanales y descuentos exclusivos.",
    color: "#b700ff",
    glow: "rgba(183,0,255,0.3)",
    pixel: "◉",
    starPixel: false,
  },
  {
    icon: Star,
    title: "Experiencia Premium",
    desc: "+10.000 clientes satisfechos. La tienda gamer de referencia en Colombia.",
    color: "#ff6b00",
    glow: "rgba(255,107,0,0.3)",
    pixel: "♦",
    starPixel: false,
  },
];

export function WhyGeekZone() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-24 relative overflow-hidden" style={{ background: "#030311" }}>
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)", transform: "translateY(-50%)" }} />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #b700ff, transparent)", transform: "translateY(-50%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p
            className="text-[#39ff14] uppercase mb-3"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            ▸ NUESTRO PODER
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
          >
            ¿POR QUÉ{" "}
            <span style={{ color: "#39ff14", textShadow: "0 0 20px #39ff14" }}>
              GEEK ZONE?
            </span>
          </h2>
          <p
            className="text-gray-400 max-w-xl mx-auto"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem" }}
          >
            No somos solo una tienda. Somos la comunidad gamer más grande de Colombia.
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#39ff14] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative rounded-2xl p-6 group overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, rgba(13,13,43,0.8), rgba(10,10,31,0.9))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                whileHover={{
                  y: -6,
                  borderColor: `${feat.color}40`,
                  boxShadow: `0 20px 50px ${feat.glow}, 0 0 0 1px ${feat.color}30`,
                }}
              >
                {/* Pixel character */}
                <div
                  className="absolute top-3 right-4 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ fontSize: "3rem", color: feat.color }}
                >
                  {feat.starPixel ? (
                    <Star
                      size={48}
                      style={{ color: feat.color, fill: feat.color }}
                    />
                  ) : (
                    <span style={{ fontFamily: "'Press Start 2P', cursive" }}>{feat.pixel}</span>
                  )}
                </div>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${feat.color}20, transparent)`,
                    borderRadius: "0 0 50% 0",
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: `${feat.color}15`,
                    border: `1px solid ${feat.color}30`,
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    boxShadow: `0 0 25px ${feat.glow}`,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon size={26} style={{ color: feat.color }} />
                </motion.div>

                <h3
                  className="text-white mb-2"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem", fontWeight: 700 }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-gray-400"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.92rem", lineHeight: 1.6 }}
                >
                  {feat.desc}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${feat.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "10K+", label: "CLIENTES FELICES", color: "#00f5ff", star: false },
            { value: "500+", label: "PRODUCTOS", color: "#ff00ea", star: false },
            { value: "5", label: "CALIFICACIÓN", color: "#ffd700", star: true },
            { value: "3 AÑOS", label: "DE EXPERIENCIA", color: "#39ff14", star: false },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-6 px-4 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(13,13,43,0.6)",
                border: `1px solid ${stat.color}20`,
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ borderColor: `${stat.color}60`, boxShadow: `0 0 30px ${stat.color}20` }}
            >
              <div
                className="flex items-center justify-center gap-1"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 900,
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}`,
                }}
              >
                {stat.value}
                {stat.star && (
                  <Star
                    size={22}
                    className="fill-[#ffd700] text-[#ffd700]"
                    style={{ filter: "drop-shadow(0 0 8px #ffd700)", marginBottom: 3 }}
                  />
                )}
              </div>
              <div
                className="text-gray-400 mt-1"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.45rem", letterSpacing: "0.1em" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}