import ExternalSecurityRoutes from "./modules/external-security/_routes";
import DashboardRoutes from "./modules/dashboard/_routes";
import UsuariosRoutes from "./modules/usuarios/_routes";
import NomencladoresRoutes from "./modules/nomencladores/_routes";
import MateriasPrimasRoutes from "./modules/materia-primas/_routes";
import SolucionAditivaRoutes from "./modules/soluciones-aditivas/_routes";
import ComponentesRoutes from "./modules/Componentes/_routes";
export default [
  ...ExternalSecurityRoutes,
  {
    path: "",
    component: () => import("./layouts/MainLayout.vue"),
    children: [
      ...DashboardRoutes,
      ...UsuariosRoutes,
      ...NomencladoresRoutes,
      ...MateriasPrimasRoutes,
      ...MateriasPrimasRoutes,
      ...SolucionAditivaRoutes,
      ...ComponentesRoutes,
    ]
  },

  // Always leave this as last one
  { path: "/:catchAll(.*)*", component: () => import("./errors/Error404Page.vue") }
];
