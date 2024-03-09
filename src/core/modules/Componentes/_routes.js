export default [
  {
  path: "componentes",
  name: "ComponentesPage",
  component: () => import("./ui/ComponentesPage.vue")
  },
  {
  path: "componentes/crear",
  name: "createComponentesPage",
  component: () => import("./ui/CreateComponentes")
  },
  {
  path: "componentes/editar/:id",
  name: "editarComponentesPage",
  component: () => import("./ui/EditarComponentes")
  },

]
