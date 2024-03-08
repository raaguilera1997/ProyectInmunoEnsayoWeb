export default [
  {
  path: "producidas",
  name: "ProducidasPage",
  component: () => import("./ui/ProducidasPage")
  },
  {
  path: "producidas/crear",
  name: "createProducidasPage",
  component: () => import("./ui/CreateMateriaPrimaProducidas")
  },
  {
  path: "producidas/editar/:id",
  name: "editarProducidasPage",
  component: () => import("./ui/EditarMateriaPrimaProducidas")
  },

]
