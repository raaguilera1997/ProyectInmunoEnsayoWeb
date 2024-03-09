import AdquiridasRoutes from "./adquiridas/_routes"
import ProducidasRoutes from "./producidas/_routes"
export default [
  {
    path: "materia-prima",
    component: () => import("../../components/router/EmptyPageComponent.vue"),
    children: [
      ...AdquiridasRoutes,
      ...ProducidasRoutes,
    ]
  }
]
