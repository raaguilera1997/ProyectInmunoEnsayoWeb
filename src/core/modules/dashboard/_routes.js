import WellcomeDashboardRoutes from "./wellcome/_routes"

export default [
  {
    path: "dashboard",
    component: () => import("../../components/router/EmptyPageComponent.vue"),
    children: [
      ...WellcomeDashboardRoutes,
    ]
  }
]
