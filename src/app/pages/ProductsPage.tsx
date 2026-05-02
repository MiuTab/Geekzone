import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams, useNavigate } from "react-router";
import {
  SlidersHorizontal,
  ChevronRight,
  X,
  ArrowUpDown,
  Gamepad2,
  Search,
  Monitor,
  Sword,
  Headphones,
  LayoutGrid,
  DollarSign,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

type Category = "all" | "xbox" | "playstation" | "games" | "accessories";
type PriceRange = "all" | "under300" | "300to800" | "over800";
type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

const categoryConfig: Record<Category, { label: string; color: string; Icon: LucideIcon }> = {
  all:         { label: "Todos",        color: "#00f5ff", Icon: LayoutGrid },
  xbox:        { label: "Xbox",         color: "#107c10", Icon: Monitor    },
  playstation: { label: "PlayStation",  color: "#003791", Icon: Gamepad2   },
  games:       { label: "Videojuegos",  color: "#ff00ea", Icon: Sword      },
  accessories: { label: "Accesorios",   color: "#ffd700", Icon: Headphones },
};

const priceOptions = [
  { value: "all" as PriceRange, label: "Todos los precios" },
  { value: "under300" as PriceRange, label: "Menos de $300k" },
  { value: "300to800" as PriceRange, label: "$300k – $800k" },
  { value: "over800" as PriceRange, label: "Más de $800k" },
];

const sortOptions = [
  { value: "relevance" as SortOption, label: "Relevancia" },
  { value: "price-asc" as SortOption, label: "Precio: Menor a Mayor" },
  { value: "price-desc" as SortOption, label: "Precio: Mayor a Menor" },
  { value: "rating" as SortOption, label: "Mejor Valorados" },
];

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);

  const initialCat = (searchParams.get("cat") as Category) || "all";

  const [category, setCategory] = useState<Category>(initialCat);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sort, setSort] = useState<SortOption>("relevance");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Sync category from URL param
  useEffect(() => {
    const cat = (searchParams.get("cat") as Category) || "all";
    setCategory(cat);
    setVisibleCount(12);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams]);

  const filtered = products.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (priceRange === "under300" && p.price >= 300000) return false;
    if (priceRange === "300to800" && (p.price < 300000 || p.price > 800000))
      return false;
    if (priceRange === "over800" && p.price <= 800000) return false;
    if (
      search.trim() &&
      !p.name.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating || b.reviews - a.reviews;
    return 0;
  });

  const visible = sorted.slice(0, visibleCount);

  const hasActiveFilters =
    category !== "all" || priceRange !== "all" || search.trim() !== "";

  const clearFilters = () => {
    setCategory("all");
    setPriceRange("all");
    setSearch("");
    setVisibleCount(12);
    navigate("/productos");
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#030311" }}
      ref={topRef}
    >
      {/* Background effects */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,245,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(183,0,255,0.04) 0%, transparent 50%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.5) 3px, rgba(0,245,255,0.5) 4px)",
        }}
      />

      {/* Header / Hero */}
      <div
        className="relative overflow-hidden pt-24 pb-10"
        style={{
          background:
            "linear-gradient(180deg, #050518 0%, #030311 100%)",
          borderBottom: "1px solid rgba(0,245,255,0.1)",
        }}
      >
        {/* Neon grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-5"
          >
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-[#00f5ff] transition-colors"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem" }}
            >
              Inicio
            </button>
            <ChevronRight size={14} className="text-gray-700" />
            <span
              className="text-[#00f5ff]"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem" }}
            >
              Productos
            </span>
            {category !== "all" && (
              <>
                <ChevronRight size={14} className="text-gray-700" />
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.85rem",
                    color: categoryConfig[category].color,
                  }}
                >
                  {categoryConfig[category].label}
                </span>
              </>
            )}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p
                className="text-[#ff00ea] uppercase mb-2"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "0.5rem",
                  letterSpacing: "0.2em",
                }}
              >
                ▸ CATÁLOGO COMPLETO
              </p>
              <h1
                className="text-white"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  fontWeight: 900,
                }}
              >
                TODOS LOS{" "}
                <span
                  style={{
                    color: "#00f5ff",
                    textShadow: "0 0 20px #00f5ff",
                  }}
                >
                  PRODUCTOS
                </span>
              </h1>
              <p
                className="text-gray-400 mt-2"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem" }}
              >
                {filtered.length} producto{filtered.length !== 1 ? "s" : ""}{" "}
                encontrado{filtered.length !== 1 ? "s" : ""}
                {category !== "all" &&
                  ` en ${categoryConfig[category].label}`}
              </p>
            </div>

            {/* Search bar */}
            <div className="relative sm:w-72">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-[#00f5ff]/50 focus:bg-[#00f5ff]/5 outline-none transition-all"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.9rem",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="sticky top-16 md:top-20 z-30 backdrop-blur-md"
        style={{
          background: "rgba(3,3,17,0.92)",
          borderBottom: "1px solid rgba(0,245,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryConfig) as Category[]).map((cat) => {
                const cfg = categoryConfig[cat];
                const active = category === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setVisibleCount(12);
                    }}
                    className="px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      background: active ? `${cfg.color}22` : "rgba(255,255,255,0.04)",
                      color: active ? cfg.color : "#9ca3af",
                      border: `1px solid ${active ? `${cfg.color}60` : "rgba(255,255,255,0.08)"}`,
                      boxShadow: active ? `0 0 12px ${cfg.color}33` : "none",
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {cfg.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Advanced Filters toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  background: showFilters ? "rgba(183,0,255,0.15)" : "rgba(183,0,255,0.05)",
                  color: "#b700ff",
                  border: `1px solid ${showFilters ? "rgba(183,0,255,0.5)" : "rgba(183,0,255,0.2)"}`,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <SlidersHorizontal size={12} />
                Filtros
              </motion.button>

              {/* Sort */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    background: "rgba(0,245,255,0.05)",
                    color: "#00f5ff",
                    border: "1px solid rgba(0,245,255,0.2)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowUpDown size={12} />
                  <span className="hidden sm:inline">
                    {sortOptions.find((s) => s.value === sort)?.label ?? "Ordenar"}
                  </span>
                  <span className="sm:hidden">Ordenar</span>
                </motion.button>

                <AnimatePresence>
                  {showSortMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-50"
                      style={{
                        background: "#0d0d2b",
                        border: "1px solid rgba(0,245,255,0.15)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                      }}
                    >
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSort(opt.value);
                            setShowSortMenu(false);
                          }}
                          className="w-full text-left px-4 py-2.5 transition-colors hover:bg-white/5"
                          style={{
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: "0.88rem",
                            color: sort === opt.value ? "#00f5ff" : "#9ca3af",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {sort === opt.value && (
                            <span className="text-[#00f5ff] mr-2">▸</span>
                          )}
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear filters */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ff00ea]/30 bg-[#ff00ea]/5 text-[#ff00ea] hover:bg-[#ff00ea]/15 transition-colors"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <X size={11} />
                    Limpiar
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Advanced filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-3 p-4 rounded-xl"
                  style={{
                    background: "rgba(13,13,43,0.8)",
                    border: "1px solid rgba(183,0,255,0.15)",
                  }}
                >
                  <p
                    className="text-gray-400 mb-3"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    RANGO DE PRECIO
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {priceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setPriceRange(opt.value);
                          setVisibleCount(12);
                        }}
                        className="px-4 py-1.5 rounded-lg transition-all"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          background:
                            priceRange === opt.value
                              ? "rgba(183,0,255,0.2)"
                              : "transparent",
                          color:
                            priceRange === opt.value ? "#b700ff" : "#9ca3af",
                          border: `1px solid ${
                            priceRange === opt.value
                              ? "rgba(183,0,255,0.5)"
                              : "rgba(255,255,255,0.08)"
                          }`,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        onClick={() => setShowSortMenu(false)}
      >
        {/* Active filters chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {category !== "all" && (() => {
                const cfg = categoryConfig[category];
                const CatIcon = cfg.Icon;
                return (
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.82rem",
                      background: `${cfg.color}15`,
                      color: cfg.color,
                      border: `1px solid ${cfg.color}40`,
                    }}
                  >
                    <CatIcon size={11} />
                    {cfg.label}
                    <button onClick={() => setCategory("all")} className="hover:opacity-60">
                      <X size={11} />
                    </button>
                  </span>
                );
              })()}
              {priceRange !== "all" && (
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.82rem",
                    background: "rgba(183,0,255,0.1)",
                    color: "#b700ff",
                    border: "1px solid rgba(183,0,255,0.3)",
                  }}
                >
                  <DollarSign size={11} />
                  {priceOptions.find((p) => p.value === priceRange)?.label}
                  <button
                    onClick={() => setPriceRange("all")}
                    className="hover:opacity-60"
                  >
                    <X size={11} />
                  </button>
                </span>
              )}
              {search.trim() && (
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.82rem",
                    background: "rgba(255,0,234,0.1)",
                    color: "#ff00ea",
                    border: "1px solid rgba(255,0,234,0.3)",
                  }}
                >
                  <Search size={11} />
                  "{search}"
                  <button onClick={() => setSearch("")} className="hover:opacity-60">
                    <X size={11} />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {visible.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 gap-5"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-6xl opacity-40"
            >
              <Gamepad2 size={64} className="text-[#00f5ff]/30" />
            </motion.div>
            <p
              className="text-gray-500 text-center"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "0.65rem",
                lineHeight: 2,
              }}
            >
              NO HAY RESULTADOS
              <br />
              <span style={{ color: "#00f5ff", fontSize: "0.5rem" }}>
                PRUEBA OTROS FILTROS
              </span>
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl border border-[#00f5ff]/30 bg-[#00f5ff]/5 text-[#00f5ff] hover:bg-[#00f5ff]/15 transition-colors"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", fontWeight: 700 }}
            >
              VER TODOS
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.35 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load more / pagination */}
            {visibleCount < sorted.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-12"
              >
                <p
                  className="text-gray-600 mb-4"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem" }}
                >
                  Mostrando{" "}
                  <span style={{ color: "#00f5ff" }}>{visible.length}</span> de{" "}
                  <span style={{ color: "#00f5ff" }}>{sorted.length}</span> productos
                </p>
                <motion.button
                  onClick={() => setVisibleCount((c) => c + 8)}
                  className="px-10 py-3 rounded-xl border border-[#00f5ff]/30 bg-[#00f5ff]/5 text-[#00f5ff] hover:bg-[#00f5ff]/15 transition-colors relative overflow-hidden group"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,245,255,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 bg-[#00f5ff]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  CARGAR MÁS PRODUCTOS
                </motion.button>
              </motion.div>
            )}

            {visibleCount >= sorted.length && sorted.length > 0 && (
              <div className="text-center mt-10 pb-4">
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "0.45rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ✓ HAS VISTO TODOS LOS PRODUCTOS
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}