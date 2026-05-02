import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProductsPage } from "./pages/ProductsPage";

export const router = createBrowserRouter([
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
