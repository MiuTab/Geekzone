import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Star } from "lucide-react";

const GAMER_IMG = "https://images.unsplash.com/photo-1758611970807-2002c7abf952?w=200&q=80";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    username: "@xXShadowXx",
    avatar: "CM",
    avatarBg: "#00f5ff",
    rating: 5,
    text: "La PS5 llegó en perfecto estado, empacada como se debe. El servicio al cliente es 10/10, me asesoraron para elegir el mejor bundle. ¡Mi setup quedó épico!",
    platform: "PlayStation",
    verified: true,
    time: "hace 2 días",
  },
  {
    id: 2,
    name: "Valentina Ríos",
    username: "@ValGamePro",
    avatar: "VR",
    avatarBg: "#ff00ea",
    rating: 5,
    text: "Compré el Elden Ring y el headset HyperX en bundle. ¡Llegaron en 24 horas! Los precios son increíbles vs otras tiendas. Ya soy cliente fija de Geek Zone.",
    platform: "Multi-plataforma",
    verified: true,
    time: "hace 1 semana",
  },
  {
    id: 3,
    name: "Andrés Torres",
    username: "@ADevil99",
    avatar: "AT",
    avatarBg: "#39ff14",
    rating: 5,
    text: "El Xbox Series X que compré es 100% original. Tienen los mejores precios en Colombia. El control Elite Series 2 es una bestia, vale cada peso. RECOMENDADOS",
    platform: "Xbox",
    verified: true,
    time: "hace 3 días",
  },
  {
    id: 4,
    name: "Isabella Castro",
    username: "@IsaGamer_",
    avatar: "IC",
    avatarBg: "#b700ff",
    rating: 5,
    text: "Primera vez comprando y quedé sorprendida. El proceso es súper fácil, el empaque cuidadoso y el producto llegó antes de lo esperado. Definitivamente vuelvo!",
    platform: "PlayStation",
    verified: true,
    time: "hace 5 días",
  },
  {
    id: 5,
    name: "Daniel Ospina",
    username: "@DarkGameX",
    avatar: "DO",
    avatarBg: "#ffd700",
    rating: 5,
    text: "Llevo 2 años comprando en Geek Zone. Nunca me han fallado. La garantía es real y el soporte es rápido. Si hay algún problema lo resuelven sin drama.",
    platform: "Xbox",
    verified: true,
    time: "hace 2 semanas",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" style={{ background: "#05051a" }}>
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(ellipse at 20% 50%, #00f5ff 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #b700ff 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p
            className="text-[#b700ff] uppercase mb-3"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            ▸ JUGADORES REALES
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
          >
            LO QUE DICE{" "}
            <span style={{ color: "#b700ff", textShadow: "0 0 20px #b700ff" }}>
              LA COMUNIDAD
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#b700ff] to-transparent mx-auto" />
        </motion.div>

        {/* Chat bubbles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative rounded-2xl p-5 group"
              style={{
                background: "linear-gradient(145deg, rgba(13,13,43,0.9), rgba(10,10,31,0.95))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              whileHover={{
                y: -4,
                borderColor: `${t.avatarBg}30`,
                boxShadow: `0 15px 40px ${t.avatarBg}20`,
              }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-5 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "2.5rem", color: t.avatarBg, lineHeight: 1 }}
              >
                "
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[#030311] flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.avatarBg}, ${t.avatarBg}aa)`,
                    boxShadow: `0 0 15px ${t.avatarBg}60`,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                  }}
                >
                  {t.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-white"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}
                    >
                      {t.name}
                    </span>
                    {t.verified && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          background: `${t.avatarBg}20`,
                          color: t.avatarBg,
                          fontFamily: "'Press Start 2P', cursive",
                          fontSize: "0.35rem",
                          border: `1px solid ${t.avatarBg}40`,
                        }}
                      >
                        ✓ VER
                      </span>
                    )}
                  </div>
                  <div
                    className="text-gray-500"
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem" }}
                  >
                    {t.username}
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className="fill-[#ffd700] text-[#ffd700]"
                    style={{ filter: "drop-shadow(0 0 4px #ffd700)" }}
                  />
                ))}
                <span
                  className="text-gray-500 ml-1"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem" }}
                >
                  {t.time}
                </span>
              </div>

              {/* Text */}
              <p
                className="text-gray-300"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}
              >
                {t.text}
              </p>

              {/* Platform badge */}
              <div className="mt-4">
                <span
                  className="px-2 py-1 rounded-lg text-xs"
                  style={{
                    background: `${t.avatarBg}15`,
                    color: t.avatarBg,
                    border: `1px solid ${t.avatarBg}30`,
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "0.4rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.platform}
                </span>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full rounded-b-2xl transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${t.avatarBg}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14 flex flex-col items-center gap-3"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={28}
                className="fill-[#ffd700] text-[#ffd700]"
                style={{ filter: "drop-shadow(0 0 8px #ffd700)" }}
              />
            ))}
          </div>
          <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#ffd700", textShadow: "0 0 20px #ffd700" }}>
            4.9 / 5.0
          </p>
          <p className="text-gray-400" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}>
            Basado en más de 2,400 reseñas verificadas
          </p>
        </motion.div>
      </div>
    </section>
  );
}