import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Gamepad2, Monitor, Sword, Headphones, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const PS5_IMG = "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80";
const XBOX_IMG = "https://images.unsplash.com/photo-1607853827120-6847830b38b0?w=600&q=80";
const GAMES_IMG = "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80";
const ACCESSORIES_IMG = "https://images.unsplash.com/photo-1586645068267-21a3e8949fdb?w=600&q=80";

const categories = [
  {
    id: "xbox",
    name: "Xbox",
    subtitle: "Series X · Series S",
    icon: Monitor,
    image: XBOX_IMG,
    color: "#107c10",
    glow: "rgba(16,124,16,0.6)",
    items: "87 productos",
    gradient: "from-[#107c10]/80 to-[#0a5a0a]/80",
  },
  {
    id: "playstation",
    name: "PlayStation",
    subtitle: "PS5 · PS4",
    icon: Gamepad2,
    image: PS5_IMG,
    color: "#003791",
    glow: "rgba(0,55,145,0.7)",
    items: "124 productos",
    gradient: "from-[#003791]/80 to-[#001f6b]/80",
  },
  {
    id: "games",
    name: "Videojuegos",
    subtitle: "RPG · Acción · Deportes",
    icon: Sword,
    image: GAMES_IMG,
    color: "#ff00ea",
    glow: "rgba(255,0,234,0.5)",
    items: "256 títulos",
    gradient: "from-[#ff00ea]/60 to-[#a100b7]/60",
  },
  {
    id: "accessories",
    name: "Accesorios",
    subtitle: "Headsets · Controles · Sillas",
    icon: Headphones,
    image: ACCESSORIES_IMG,
    color: "#00f5ff",
    glow: "rgba(0,245,255,0.5)",
    items: "198 accesorios",
    gradient: "from-[#00f5ff]/50 to-[#0095ff]/50",
  },
];

export function Categories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  const goToCategory = (catId: string) => {
    navigate(`/productos?cat=${catId}`);
  };

  return (
    <section id="categories" className="py-24 relative" style={{ background: "#030311" }}>
      {/* Section bg pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #00f5ff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #b700ff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-[#00f5ff] uppercase mb-3"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            ▸ EXPLORAR
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
          >
            CATEGORÍAS{" "}
            <span style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff" }}>
              PRINCIPALES
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent mx-auto" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isHovered = hovered === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => goToCategory(cat.id)}
                onHoverStart={() => setHovered(cat.id)}
                onHoverEnd={() => setHovered(null)}
                className="relative overflow-hidden rounded-2xl group text-left"
                style={{ height: "340px" }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 60px ${cat.glow}, 0 0 0 1px ${cat.color}60`,
                }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cat.image})` }}
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} to-[#030311]/60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030311]/90 via-[#030311]/30 to-transparent" />

                {/* CRT scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
                  }}
                />

                {/* Border glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border"
                  animate={{
                    borderColor: isHovered ? `${cat.color}80` : "rgba(255,255,255,0.1)",
                    boxShadow: isHovered ? `inset 0 0 30px ${cat.glow}` : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Icon Badge */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}50` }}
                    animate={{ boxShadow: isHovered ? `0 0 20px ${cat.glow}` : "none" }}
                  >
                    <Icon
                      size={22}
                      style={{ color: cat.color, filter: isHovered ? `drop-shadow(0 0 8px ${cat.color})` : "none" }}
                    />
                  </motion.div>

                  <div>
                    {/* Items count */}
                    <motion.p
                      className="text-xs uppercase mb-2"
                      style={{
                        fontFamily: "'Press Start 2P', cursive",
                        fontSize: "0.45rem",
                        letterSpacing: "0.1em",
                        color: cat.color,
                        opacity: isHovered ? 1 : 0.7,
                      }}
                    >
                      {cat.items}
                    </motion.p>

                    <h3
                      className="text-white mb-1"
                      style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.4rem", fontWeight: 800 }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="text-gray-400"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem" }}
                    >
                      {cat.subtitle}
                    </p>

                    <motion.div
                      className="mt-4 flex items-center gap-2"
                      animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    >
                      <span
                        className="uppercase"
                        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.65rem", color: cat.color, fontWeight: 700 }}
                      >
                        Explorar
                      </span>
                      <ChevronRight size={14} style={{ color: cat.color }} />
                    </motion.div>
                  </div>
                </div>

                {/* Power-up effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    background: isHovered
                      ? `radial-gradient(circle at 50% 100%, ${cat.glow} 0%, transparent 70%)`
                      : "transparent",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}