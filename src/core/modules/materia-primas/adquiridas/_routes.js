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
  // {
  // path: "usuario/editar/:id",
  // name: "editUserPage",
  // component: () => import("./ui/EditUserPage")
  // },

]
