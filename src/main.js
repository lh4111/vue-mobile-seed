import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./components";
import "./directives";
import "./filters";
import "./registerServiceWorker";

import "./assets/style/main.styl";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
