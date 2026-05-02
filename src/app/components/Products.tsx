import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { SlidersHorizontal, ChevronDown, Star } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

type Category = "all" | "xbox" | "playstation" | "games" | "accessories";
type PriceRange = "all" | "under300" | "300to800" | "over800";
type BadgeFilter = "all" | "Nuevo" | "Oferta" | "Top";

const categoryLabels: Record<Category, string> = {
  all: "Todos",
  xbox: "Xbox",
  playstation: "PlayStation",
  games: "Videojuegos",
  accessories: "Accesorios",
};

export function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [category, setCategory] = useState<Category>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [badge, setBadge] = useState<BadgeFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = products.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (badge !== "all" && p.badge !== badge) return false;
    if (priceRange === "under300" && p.price >= 300000) return false;
    if (priceRange === "300to800" && (p.price < 300000 || p.price > 800000)) return false;
    if (priceRange === "over800" && p.price <= 800000) return false;
    return true;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="products" className="py-24 relative" style={{ background: "#05051a" }}>
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-5 blur-[120px]"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-5 blur-[100px]"
        style={{ background: "radial-gradient(circle, #b700ff, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-[#ff00ea] uppercase mb-3"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            ▸ E-COMMERCE
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
          >
            PRODUCTOS{" "}
            <span style={{ color: "#ff00ea", textShadow: "0 0 20px #ff00ea" }}>
              DESTACADOS
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#ff00ea] to-transparent mx-auto" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {(Object.keys(categoryLabels) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setVisibleCount(8); }}
              className="px-4 py-2 rounded-xl transition-all duration-200 relative overflow-hidden"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                background: category === cat
                  ? "linear-gradient(135deg, #00f5ff, #0095ff)"
                  : "rgba(0,245,255,0.05)",
                color: category === cat ? "#030311" : "#00f5ff",
                border: `1px solid ${category === cat ? "#00f5ff" : "rgba(0,245,255,0.2)"}`,
                boxShadow: category === cat ? "0 0 20px rgba(0,245,255,0.4)" : "none",
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#b700ff]/30 bg-[#b700ff]/5 text-[#b700ff] hover:bg-[#b700ff]/15 transition-colors"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", fontWeight: 700 }}
          >
            <SlidersHorizontal size={14} />
            Filtros
            <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </motion.div>

        {/* Extended Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-4 justify-center mb-8 p-5 rounded-2xl border border-[#b700ff]/20 bg-[#0d0d2b]/50"
            >
              {/* Price Range */}
              <div>
                <p className="text-gray-400 mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                  PRECIO
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all" as PriceRange, label: "Todos" },
                    { value: "under300" as PriceRange, label: "< $300k" },
                    { value: "300to800" as PriceRange, label: "$300k - $800k" },
                    { value: "over800" as PriceRange, label: "> $800k" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setPriceRange(opt.value); setVisibleCount(8); }}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.8rem",
                        background: priceRange === opt.value ? "#b700ff30" : "transparent",
                        color: priceRange === opt.value ? "#b700ff" : "#999",
                        border: `1px solid ${priceRange === opt.value ? "#b700ff60" : "#ffffff15"}`,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge Filter */}
              <div>
                <p className="text-gray-400 mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                  BADGE
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["all", "Nuevo", "Oferta", "Top"] as BadgeFilter[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => { setBadge(b); setVisibleCount(8); }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.8rem",
                        background: badge === b ? "#ff00ea20" : "transparent",
                        color: badge === b ? "#ff00ea" : "#999",
                        border: `1px solid ${badge === b ? "#ff00ea40" : "#ffffff15"}`,
                      }}
                    >
                      {b === "Top" && <Star size={11} className="fill-[#ffd700] text-[#ffd700]" />}
                      {b === "all" ? "Todos" : b}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-gray-500 mb-6 text-center"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem" }}
        >
          Mostrando{" "}
          <span style={{ color: "#00f5ff" }}>{Math.min(visible.length, filtered.length)}</span>{" "}
          de{" "}
          <span style={{ color: "#00f5ff" }}>{filtered.length}</span> productos
        </motion.p>

        {/* Products Grid */}
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <p
              className="text-gray-400"
              style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.7rem" }}
            >
              NO HAY RESULTADOS
            </p>
            <p className="text-gray-600 mt-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Prueba con otros filtros
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        {visibleCount < filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10"
          >
            <motion.button
              onClick={() => setVisibleCount((c) => c + 4)}
              className="px-8 py-3 rounded-xl border border-[#00f5ff]/40 bg-[#00f5ff]/5 text-[#00f5ff] hover:bg-[#00f5ff]/15 transition-colors"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", fontWeight: 700 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,245,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              CARGAR MÁS
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}