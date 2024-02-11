export default [
  {
  path: "nomencladores/materia-prima-adquirida",
  name: "NomMPAdquirida",
  component: () => import("./ui/NomencladorMPAdquirida")
  },
  {
  path: "nomencladores/materia-prima-adquirida/crear",
  name: "createNomMatAdquiridaPage",
  component: () => import("./ui/CrearNomMPAdquiridaPage")
  },
  {
  path: "nomencladores/materia-prima-adquirida/editar/:id",
  name: "editNomMatAdquiridaPage",
  component: () => import("./ui/EditNomMPAdquirida")
  },

]
