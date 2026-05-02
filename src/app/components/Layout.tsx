import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Cart } from "./Cart";

export function Layout() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#030311", fontFamily: "'Rajdhani', sans-serif" }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
