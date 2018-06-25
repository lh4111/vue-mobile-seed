import Vue from "vue";
const GlobalDirectives = {};

Object.keys(GlobalDirectives).forEach(key =>
  Vue.directive(key, GlobalDirectives[key])
);
