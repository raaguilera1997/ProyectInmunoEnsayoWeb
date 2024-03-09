import AdquiridasRoutes from "./adquiridas/_routes"
import ProducidasRoutes from "./producidas/_routes"
import SolucionesAditivasRoutes from "./soluciones-aditivas/_routes"

export default [
  {
    path: "materia-prima",
    component: () => import("../../components/router/EmptyPageComponent.vue"),
    children: [
      ...AdquiridasRoutes,
      ...ProducidasRoutes,
      ...SolucionesAditivasRoutes,
    ]
  }
]
