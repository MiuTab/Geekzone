import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { ShoppingCart, Star, Zap } from "lucide-react";
import type { Product } from "../context/CartContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

const BADGE_STYLES: Record<string, { bg: string; text: string; glow: string }> = {
  Nuevo: { bg: "bg-[#00f5ff]", text: "text-[#030311]", glow: "shadow-[0_0_12px_#00f5ff]" },
  Oferta: { bg: "bg-[#ff00ea]", text: "text-white", glow: "shadow-[0_0_12px_#ff00ea]" },
  Top: { bg: "bg-[#ffd700]", text: "text-[#030311]", glow: "shadow-[0_0_12px_#ffd700]" },
};

interface PixelParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem, lastAdded } = useCart();
  const [particles, setParticles] = useState<PixelParticle[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const isAdded = lastAdded === product.id;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    rotateX.set(x);
    rotateY.set(y);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);

    // Pixel explosion
    const colors = ["#00f5ff", "#ff00ea", "#ffd700", "#39ff14", "#b700ff"];
    const newParticles: PixelParticle[] = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x: 50,
      y: 50,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 700);
  };

  const badge = product.badge ? BADGE_STYLES[product.badge] : null;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: "linear-gradient(145deg, #0d0d2b, #0a0a1f)",
        border: "1px solid rgba(0,245,255,0.12)",
        transformStyle: "preserve-3d",
        rotateX: springX,
        rotateY: springY,
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        boxShadow: "0 20px 50px rgba(0,245,255,0.15), 0 0 0 1px rgba(0,245,255,0.25)",
        y: -5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-[#0d0d2b] to-[#1a1a3e]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030311]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* CRT effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
          }}
        />

        {/* Badge */}
        {badge && product.badge && (
          <div
            className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${badge.bg} ${badge.text} ${badge.glow}`}
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.55rem", letterSpacing: "0.05em" }}
          >
            {product.badge === "Top" && (
              <Star size={8} className="fill-current" />
            )}
            {product.badge === "Oferta" && discount ? `-${discount}%` : product.badge.toUpperCase()}
          </div>
        )}

        {/* Platform badge */}
        {product.platform && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs bg-black/60 border border-white/10 text-white/70"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em" }}
          >
            {product.platform}
          </div>
        )}

        {/* Quick add button overlay */}
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
        >
          <span
            className="flex items-center gap-1 text-[#00f5ff] bg-[#030311]/80 px-3 py-1 rounded-full border border-[#00f5ff]/30"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.45rem" }}
          >
            <Star
              size={9}
              className="fill-[#ffd700] text-[#ffd700]"
              style={{ filter: "drop-shadow(0 0 4px #ffd700)" }}
            />
            {product.rating}.0
          </span>
        </div>

        {/* Pixel explosion particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none rounded-sm"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 6px ${p.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.vx * 20,
                y: p.vy * 20,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Name */}
        <h3
          className="text-white mb-1 line-clamp-2 group-hover:text-[#00f5ff] transition-colors"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.4 }}
        >
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < product.rating ? "fill-[#ffd700] text-[#ffd700]" : "text-gray-600"}
            />
          ))}
          <span
            className="text-gray-500 ml-1"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem" }}
          >
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div
              className="text-[#00f5ff]"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                textShadow: "0 0 10px rgba(0,245,255,0.5)",
              }}
            >
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div
                className="text-gray-500 line-through"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem" }}
              >
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Add to cart */}
          <motion.button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl relative overflow-hidden"
            style={{
              background: isAdded
                ? "linear-gradient(135deg, #39ff14, #00a800)"
                : "linear-gradient(135deg, #00f5ff22, #0095ff22)",
              border: `1px solid ${isAdded ? "#39ff14" : "#00f5ff44"}`,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              color: isAdded ? "#39ff14" : "#00f5ff",
              boxShadow: isAdded ? "0 0 15px rgba(57,255,20,0.5)" : "none",
              transition: "all 0.3s",
            }}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(135deg, #00f5ff, #0095ff)",
              color: "#030311",
              boxShadow: "0 0 20px rgba(0,245,255,0.5)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={isAdded ? { rotate: [0, 360] } : { rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              {isAdded ? <Zap size={13} /> : <ShoppingCart size={13} />}
            </motion.span>
            {isAdded ? "¡LISTO!" : "AGREGAR"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}