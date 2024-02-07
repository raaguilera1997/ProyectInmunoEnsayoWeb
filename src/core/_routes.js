import ExternalSecurityRoutes from "./modules/external-security/_routes";
import DashboardRoutes from "./modules/dashboard/_routes";
export default [
  ...ExternalSecurityRoutes,
  {
    path: "",
    component: () => import("./layouts/MainLayout.vue"),
    children: [
      ...DashboardRoutes,
    ]
  },

  // Always leave this as last one
  { path: "/:catchAll(.*)*", component: () => import("./errors/Error404Page.vue") }
];
