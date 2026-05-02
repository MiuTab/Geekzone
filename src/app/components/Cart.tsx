import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag, Zap, CreditCard, Gamepad2, ShoppingCart, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCheckout(true);
    setTimeout(() => {
      setCheckout(false);
      setOrderDone(true);
      clearCart();
      setTimeout(() => {
        setOrderDone(false);
        closeCart();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{
              background: "linear-gradient(180deg, #0a0a1f, #050510)",
              borderLeft: "1px solid rgba(0,245,255,0.15)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5), -5px 0 0 rgba(0,245,255,0.05)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(0,245,255,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)" }}
                >
                  <ShoppingBag size={16} className="text-[#00f5ff]" />
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "white" }}>
                    CARRITO
                  </h2>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem", color: "#00f5ff" }}>
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-[#ff00ea] hover:bg-[#ff00ea]/10 transition-colors"
                    title="Vaciar carrito"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* CRT scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.5) 3px, rgba(0,245,255,0.5) 4px)" }}
            />

            {/* Content */}
            {orderDone ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center gap-4 px-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)", boxShadow: "0 0 30px rgba(0,245,255,0.3)" }}
                >
                  <Gamepad2 size={36} className="text-[#00f5ff]" style={{ filter: "drop-shadow(0 0 8px #00f5ff)" }} />
                </motion.div>
                <div
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.8rem", color: "#39ff14", textAlign: "center", textShadow: "0 0 20px #39ff14" }}
                >
                  ¡ORDEN COMPLETADA!
                </div>
                <p className="text-gray-400 text-center" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}>
                  Tu pedido está confirmado. ¡Prepara tu setup!
                </p>
              </motion.div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-30"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <ShoppingCart size={32} className="text-gray-400" />
                </motion.div>
                <p
                  className="text-gray-500 text-center"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem", lineHeight: 1.8 }}
                >
                  CARRITO VACÍO
                  <br />
                  <span style={{ color: "#00f5ff", fontSize: "0.5rem" }}>AGREGA PRODUCTOS</span>
                </p>
                <motion.button
                  onClick={() => { closeCart(); navigate("/productos"); }}
                  className="px-5 py-2.5 rounded-xl text-[#030311]"
                  style={{
                    background: "linear-gradient(135deg, #00f5ff, #0095ff)",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    boxShadow: "0 0 15px rgba(0,245,255,0.4)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VER PRODUCTOS
                </motion.button>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex gap-3 p-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(0,245,255,0.08)",
                        }}
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#0d0d2b]">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-white line-clamp-2 mb-1"
                            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem", fontWeight: 600 }}
                          >
                            {item.name}
                          </p>
                          <p
                            className="text-[#00f5ff]"
                            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", fontWeight: 700 }}
                          >
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Qty + Remove */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-600 hover:text-[#ff00ea] transition-colors p-1"
                          >
                            <X size={12} />
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-md flex items-center justify-center text-[#00f5ff] hover:bg-[#00f5ff]/15 transition-colors"
                              style={{ border: "1px solid rgba(0,245,255,0.3)" }}
                            >
                              <Minus size={10} />
                            </button>
                            <span
                              className="text-white w-4 text-center"
                              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md flex items-center justify-center text-[#00f5ff] hover:bg-[#00f5ff]/15 transition-colors"
                              style={{ border: "1px solid rgba(0,245,255,0.3)" }}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div
                  className="px-6 py-5 space-y-4"
                  style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}
                >
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span
                      className="text-gray-400"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", letterSpacing: "0.05em" }}
                    >
                      SUBTOTAL
                    </span>
                    <span
                      style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem", fontWeight: 700, color: "white" }}
                    >
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-gray-400"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem" }}
                    >
                      Envío
                    </span>
                    <span
                      className="text-[#39ff14]"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
                    >
                      GRATIS
                    </span>
                  </div>

                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span
                      className="text-white"
                      style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.85rem", fontWeight: 700 }}
                    >
                      TOTAL
                    </span>
                    <span
                      style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: "#00f5ff", textShadow: "0 0 15px rgba(0,245,255,0.5)" }}
                    >
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <motion.button
                    onClick={handleCheckout}
                    disabled={checkout}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl"
                    style={{
                      background: checkout
                        ? "rgba(0,245,255,0.2)"
                        : "linear-gradient(135deg, #00f5ff, #0095ff)",
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: checkout ? "#00f5ff" : "#030311",
                      boxShadow: checkout ? "none" : "0 0 25px rgba(0,245,255,0.4)",
                    }}
                    whileHover={!checkout ? {
                      scale: 1.02,
                      boxShadow: "0 0 35px rgba(0,245,255,0.6)",
                    } : {}}
                    whileTap={!checkout ? { scale: 0.98 } : {}}
                  >
                    {checkout ? (
                      <>
                        <motion.div
                          className="w-4 h-4 rounded-full border-2 border-[#00f5ff] border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        />
                        PROCESANDO...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        FINALIZAR COMPRA
                        <Zap size={14} />
                      </>
                    )}
                  </motion.button>

                  <p
                    className="text-center text-gray-600"
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem" }}
                  >
                    <Lock size={11} className="inline mr-1 mb-0.5" />
                    Pago seguro · SSL encriptado
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}