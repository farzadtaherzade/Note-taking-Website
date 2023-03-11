import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const AUTH_TOKEN = "";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

import { BiEyeFill, BiEyeSlashFill, BiArrowLeft } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from "oh-vue-icons";

addIcons(BiEyeFill, BiEyeSlashFill, BiArrowLeft);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
