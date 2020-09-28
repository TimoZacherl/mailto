import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import VueClipboard from "vue-clipboard2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPaperPlane,
  faQuestionCircle
} from "@fortawesome/free-regular-svg-icons";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

library.add([faPaperPlane, faQuestionCircle, faGithub, faTwitter]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
