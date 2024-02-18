export default [
  {
  path: "adquiridas",
  name: "AdquiridasPage",
  component: () => import("./ui/AdquiridasPage")
  },
  {
  path: "adquiridas/crear",
  name: "createAdquiridasPage",
  component: () => import("./ui/CreateMateriaPrimaAdquirida")
  },
  {
  path: "adquiridas/editar/:id",
  name: "editarAdquiridasPage",
  component: () => import("./ui/EditarMateriaPrimaAdquirida")
  },

]
