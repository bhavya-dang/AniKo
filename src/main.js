import Vue from "vue";
// import { ref } from "vue";
import App from "./App.vue";
import axios from "axios";
import "@/assets/css/tailwind.css";
import Toasted from "vue-toasted";
import VueProgressBar from "vue-progressbar";
import moment from "moment";

Vue.config.productionTip = true;
const options = {
  color: "#10b981",
  backgroundColor: "rgb(55 65 81)",
  failedColor: "red",
  thickness: "4.4px",
  transition: {
    speed: "0.02s",
    opacity: "0.6s",
    termination: 400,
  },
};

Vue.use(VueProgressBar, options);
Vue.use(axios);
Vue.prototype.moment = moment;
Vue.use(Toasted, {
  iconPack: "fontawesome",
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
