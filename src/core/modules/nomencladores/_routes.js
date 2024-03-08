import NomencladorMPAdquiridaRoutes from "./nomenclador-mp-adquirida/_routes"
import NomencladorMPProducidaRoutes from "./nomenclador-mp-producida/_routes"
export default [
  {
    path: "nomencladores",
    component: () => import("../../components/router/EmptyPageComponent.vue"),
    children: [
      ...NomencladorMPAdquiridaRoutes,
      ...NomencladorMPProducidaRoutes,
    ]
  }
]
