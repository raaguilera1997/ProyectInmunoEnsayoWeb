import UsuariosRoutes from "./usuario/_routes"

export default [
  {
    path: "usuarios",
    component: () => import("../../components/router/EmptyPageComponent.vue"),
    children: [
      ...UsuariosRoutes,
    ]
  }
]
