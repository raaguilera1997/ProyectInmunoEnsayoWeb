import UsuariosRoutes from "./usuario/_routes"

export default [
  {
    path: "dashboard",
    component: () => import("../../components/router/EmptyPageComponent.vue"),
    children: [
      ...UsuariosRoutes,
    ]
  }
]
