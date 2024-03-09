export default [
  {
  path: "soluciones-aditivas",
  name: "SolucionesAditivasPage",
  component: () => import("./ui/SolucionesAditivasPage")
  },
  {
  path: "soluciones-aditivas/crear",
  name: "createSolucionesAditivasPage",
  component: () => import("./ui/CreateMPSolucionesAditivas")
  },
  {
  path: "soluciones-aditivas/editar/:id",
  name: "editarSolucionesAditivasPage",
  component: () => import("./ui/EditarMPSolucionesAditivas")
  },

]
