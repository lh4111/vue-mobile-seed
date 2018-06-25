import Vue from "vue";
import Scroll from "./Scroll";

const GlobalComponents = {
  Scroll
};

Object.keys(GlobalComponents).forEach(key =>
  Vue.component(key, GlobalComponents[key])
);
