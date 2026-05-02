import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Zap, ChevronRight, Gamepad2, Star } from "lucide-react";
import { useNavigate } from "react-router";

const HERO_BG = "https://images.unsplash.com/photo-1768141729869-f76f4f367b1f?w=1920&q=80";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const colors = ["#00f5ff", "#b700ff", "#ff00ea", "#39ff14", "#ffffff"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // Draw connecting lines
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = "#00f5ff";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#030311" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030311]/70 via-transparent to-[#030311]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030311]/80 via-transparent to-[#030311]/60" />

      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)",
        }}
      />

      {/* Particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Neon grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00f5ff]/40 bg-[#00f5ff]/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse shadow-[0_0_8px_#00f5ff]" />
            <span
              className="text-[#00f5ff] uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em" }}
            >
              Tienda Gamer Premium · Bogotá, Colombia
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <img
              src="https://i.imgur.com/VZp3k22.jpeg"
              alt="Geek Zone"
              className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border-2 border-[#00f5ff]/60 shadow-[0_0_30px_rgba(0,245,255,0.5),0_0_60px_rgba(0,245,255,0.2)]"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white mb-4 leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1 }}
          >
            SUBE DE NIVEL
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #00f5ff, #b700ff, #ff00ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(0,245,255,0.5))",
              }}
            >
              TU EXPERIENCIA
            </span>
            <br />
            <span style={{ color: "#00f5ff", textShadow: "0 0 30px #00f5ff, 0 0 60px rgba(0,245,255,0.5)" }}>
              GAMER
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 mb-8 max-w-xl"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.15rem", fontWeight: 400, lineHeight: 1.7 }}
          >
            Consolas, videojuegos y accesorios de la más alta calidad.
            Xbox · PlayStation · Accesorios Pro — Todo en un mismo lugar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              onClick={() => navigate("/productos")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-[#030311] relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #00f5ff, #0095ff)",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                boxShadow: "0 0 25px rgba(0,245,255,0.5), 0 0 50px rgba(0,245,255,0.2)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(0,245,255,0.7), 0 0 80px rgba(0,245,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              <Zap size={18} />
              COMPRAR AHORA
            </motion.button>

            <motion.button
              onClick={() => scrollTo("#categories")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-[#00f5ff] border border-[#00f5ff]/50 bg-[#00f5ff]/5 hover:bg-[#00f5ff]/15 transition-colors group"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gamepad2 size={18} />
              VER CONSOLAS
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-8 mt-12"
          >
            {[
              { value: "+500", label: "Productos", star: false },
              { value: "10K+", label: "Clientes", star: false },
              { value: "4.9", label: "Calificación", star: true },
              { value: "24/7", label: "Soporte", star: false },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="flex items-center justify-center gap-1"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#00f5ff", textShadow: "0 0 15px rgba(0,245,255,0.6)" }}
                >
                  {stat.value}
                  {stat.star && (
                    <Star
                      size={18}
                      className="fill-[#ffd700] text-[#ffd700]"
                      style={{ filter: "drop-shadow(0 0 6px #ffd700)", marginBottom: 2 }}
                    />
                  )}
                </div>
                <div
                  className="text-gray-400 uppercase"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div
          className="text-[#00f5ff]/60 uppercase"
          style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.4rem", letterSpacing: "0.2em" }}
        >
          SCROLL
        </div>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#00f5ff]/60 to-transparent" />
      </motion.div>
    </section>
  );
}