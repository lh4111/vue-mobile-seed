import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
// import Index from '@/pages/Index'
// import ListTemp from '@/pages/ListTemp'

Vue.use(Router);

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
