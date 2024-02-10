export default [
  {
  path: "usuario",
  name: "UserPage",
  component: () => import("./ui/UserPage")
  },
  {
  path: "usuario/crear",
  name: "createUserPage",
  component: () => import("./ui/CreateUserPage")
  },
  {
  path: "usuario/editar/:id",
  name: "editUserPage",
  component: () => import("./ui/EditUserPage")
  },

]
