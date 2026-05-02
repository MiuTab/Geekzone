import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Gamepad2, Trophy } from "lucide-react";

export function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="newsletter" className="py-20 relative overflow-hidden" style={{ background: "#030311" }}>
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.8) 3px, rgba(0,245,255,0.8) 4px)",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00f5ff]/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00f5ff]/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00f5ff]/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00f5ff]/30" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p
            className="text-[#ffd700] uppercase mb-3"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            ▸ ÚNETE A LA GUILD
          </p>
          <h2
            className="text-white mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800 }}
          >
            ACTIVA TU{" "}
            <span style={{ color: "#ffd700", textShadow: "0 0 20px #ffd700" }}>
              POWER-UP
            </span>
          </h2>
          <p
            className="text-gray-400 mb-10"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
          >
            Suscríbete y recibe alertas de ofertas exclusivas, lanzamientos y bundles
            especiales antes que nadie. ¡Tu próxima compra con 10% OFF!
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { Icon: Zap, text: "10% OFF primera compra" },
            { Icon: Gamepad2, text: "Alertas de stock" },
            { Icon: Trophy, text: "Acceso anticipado" },
          ].map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: "rgba(0,245,255,0.05)",
                border: "1px solid rgba(0,245,255,0.15)",
              }}
            >
              <b.Icon size={14} className="text-[#00f5ff] flex-shrink-0" />
              <span
                className="text-gray-300"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem" }}
              >
                {b.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative">
              {/* Retro terminal look */}
              <div
                className="rounded-2xl p-1"
                style={{
                  background: "linear-gradient(135deg, #00f5ff20, #b700ff20)",
                  border: "1px solid rgba(0,245,255,0.25)",
                  boxShadow: "0 0 30px rgba(0,245,255,0.1), inset 0 0 30px rgba(0,245,255,0.03)",
                }}
              >
                <div
                  className="rounded-xl p-3 flex items-center gap-3"
                  style={{ background: "#0a0a1f" }}
                >
                  {/* Terminal prompt */}
                  <span
                    className="text-[#00f5ff] flex-shrink-0"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.55rem" }}
                  >
                    &gt;_
                  </span>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ingresa tu email aqui..."
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-600"
                    style={{
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: "0.6rem",
                      letterSpacing: "0.05em",
                      color: "#00f5ff",
                    }}
                  />

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl flex-shrink-0"
                    style={{
                      background: loading
                        ? "rgba(0,245,255,0.2)"
                        : "linear-gradient(135deg, #00f5ff, #0095ff)",
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: loading ? "#00f5ff" : "#030311",
                      boxShadow: loading ? "none" : "0 0 20px rgba(0,245,255,0.4)",
                    }}
                    whileHover={!loading ? {
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(0,245,255,0.6)",
                    } : {}}
                    whileTap={!loading ? { scale: 0.95 } : {}}
                  >
                    {loading ? (
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-[#00f5ff] border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Zap size={14} />
                        ACTIVAR
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Loading bar */}
              {loading && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #00f5ff, #b700ff, #ff00ea)" }}
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="py-10 px-6 rounded-2xl"
              style={{
                background: "rgba(57,255,20,0.05)",
                border: "1px solid rgba(57,255,20,0.3)",
                boxShadow: "0 0 40px rgba(57,255,20,0.1)",
              }}
            >
              <div
                className="text-[#39ff14] mb-2"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.9rem", textShadow: "0 0 20px #39ff14" }}
              >
                ✓ POWER-UP ACTIVADO!
              </div>
              <p
                className="text-gray-400 mt-3"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}
              >
                ¡Bienvenido a la guild! Tu código de 10% OFF fue enviado a tu email.
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mt-5"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem" }}
        >
          Sin spam. Puedes cancelar cuando quieras.
        </motion.p>
      </div>
    </section>
  );
}