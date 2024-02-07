import { route } from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import { getAccessTokenFromLocalStorage }   from "src/infrastructure/store/security/TokenManagmentStore";
import { LocalStorage }                          from "app/node_modules/quasar";
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === "history" ? createWebHistory : createWebHashHistory);
export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(
    process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
  ),
});

export default route(function (/* { store, ssrContext } */) {
  const routesWithOutSecurity = [ "ForgotPasswordPage", "ResetPasswordPage" ];
  Router.beforeEach( ( to: any, from: any, next: any ) => {
    // This condition is for external security
    if ( routesWithOutSecurity.includes( to.name ) ) {
      return next();
    }
    if ( to.name === "LoginPage" && getAccessTokenFromLocalStorage() ) {
      return next( { name: "WelcomeDashboardPage" } );
    }
    if ( to.name != "LoginPage" && !getAccessTokenFromLocalStorage() ) {
      return next( { name: "LoginPage" } );
    }
    if ( to.name == undefined && !getAccessTokenFromLocalStorage() ) {
      return next( { name: "LoginPage" } );
    }
    next();
  } );
  return Router;
});
