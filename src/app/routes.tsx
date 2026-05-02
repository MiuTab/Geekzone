import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProductsPage } from "./pages/ProductsPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "productos", Component: ProductsPage },
      { path: "*", Component: Home },
    ],
  },
]);
