import Vue from "vue";
const GlobalFilters = {};

Object.keys(GlobalFilters).forEach(key => Vue.filter(key, GlobalFilters[key]));
